import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Eventos que LIBERAM acesso e que REVOGAM acesso.
const PAGO = new Set(["PAYMENT_CONFIRMED", "PAYMENT_RECEIVED"]);
const ESTORNO = new Set([
  "PAYMENT_REFUNDED",
  "PAYMENT_PARTIALLY_REFUNDED",
  "PAYMENT_CHARGEBACK_REQUESTED",
  "PAYMENT_CHARGEBACK_DISPUTE",
]);

// Compara o token do header com o secreto, em tempo constante (anti timing-attack).
function tokenValido(request: Request): boolean {
  const esperado = process.env.ASAAS_WEBHOOK_TOKEN ?? "";
  const recebido = request.headers.get("asaas-access-token") ?? "";
  if (!esperado || !recebido) return false;
  const a = Buffer.from(esperado);
  const b = Buffer.from(recebido);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  // 1) só a Asaas (com o token certo) processa
  if (!tokenValido(request)) {
    return new NextResponse("unauthorized", { status: 401 });
  }

  let evt: {
    id?: string;
    event?: string;
    payment?: { id?: string; externalReference?: string | null };
  };
  try {
    evt = await request.json();
  } catch {
    return new NextResponse("bad json", { status: 400 });
  }

  const admin = createAdminClient();

  // 2) idempotência: se já vimos este evt_id, ignora (a Asaas reenvia).
  if (evt.id) {
    const { error } = await admin
      .from("asaas_eventos")
      .insert({ evt_id: evt.id, event: evt.event ?? null });
    // 23505 = chave duplicada → reenvio já processado.
    if (error && (error as { code?: string }).code === "23505") {
      return NextResponse.json({ ok: true, duplicate: true });
    }
    // outros erros (ex.: tabela ainda não criada) → segue sem bloquear.
  }

  const event = evt.event ?? "";
  const payment = evt.payment;
  if (!event || !payment?.id) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const [userId, tipo, itemId] = String(payment.externalReference ?? "").split("|");

  try {
    if (PAGO.has(event)) {
      if (userId && tipo) {
        // atualiza a compra pendente (se houver) ou cria confirmada.
        const { data: atualizada } = await admin
          .from("compras")
          .update({ status: "confirmado", user_id: userId, tipo, item_id: itemId || null })
          .eq("asaas_payment_id", payment.id)
          .select("id");

        if (!atualizada || atualizada.length === 0) {
          await admin.from("compras").insert({
            user_id: userId,
            tipo,
            item_id: itemId || null,
            asaas_payment_id: payment.id,
            status: "confirmado",
          });
        }
      }
    } else if (ESTORNO.has(event)) {
      // estorno/chargeback → revoga o acesso.
      await admin
        .from("compras")
        .update({ status: "estornado" })
        .eq("asaas_payment_id", payment.id);
    }
    // demais eventos: apenas confirma recebimento.
  } catch {
    // erro ao persistir → 500 faz a Asaas reenviar depois.
    return new NextResponse("erro ao processar", { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
