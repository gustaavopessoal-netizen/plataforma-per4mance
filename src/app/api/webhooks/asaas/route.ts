import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { enviarEmailDefinirSenha } from "@/lib/conta";

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

  // 2) idempotência: se já PROCESSAMOS este evento, ignora. Aqui só CHECAMOS —
  //    o registro do evt_id é gravado DEPOIS de liberar com sucesso (senão uma
  //    falha transitória marcaria como "processado" sem nunca liberar o acesso).
  if (evt.id) {
    const { data: jaVisto } = await admin
      .from("asaas_eventos")
      .select("evt_id")
      .eq("evt_id", evt.id)
      .maybeSingle();
    if (jaVisto) return NextResponse.json({ ok: true, duplicate: true });
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
        // confirma a compra — MAS nunca re-confirma uma já estornada.
        const { data: atualizada } = await admin
          .from("compras")
          .update({ status: "confirmado", user_id: userId, tipo, item_id: itemId || null })
          .eq("asaas_payment_id", payment.id)
          .neq("status", "estornado")
          .select("id");

        if (!atualizada || atualizada.length === 0) {
          // só cria nova linha se NÃO existir nenhuma p/ esse pagamento
          // (evita re-liberar uma compra estornada por um evento tardio).
          const { data: existe } = await admin
            .from("compras")
            .select("id")
            .eq("asaas_payment_id", payment.id)
            .limit(1);
          if (!existe || existe.length === 0) {
            await admin.from("compras").insert({
              user_id: userId,
              tipo,
              item_id: itemId || null,
              asaas_payment_id: payment.id,
              status: "confirmado",
            });
          }
        }

        // Conta nova (criada no checkout de visitante)? Manda o e-mail para o
        // cliente DEFINIR A SENHA — só uma vez (marca precisa_senha = false).
        try {
          const { data: u } = await admin.auth.admin.getUserById(userId);
          const meta = (u?.user?.user_metadata ?? {}) as { precisa_senha?: boolean };
          if (u?.user?.email && meta.precisa_senha) {
            await enviarEmailDefinirSenha(u.user.email);
            await admin.auth.admin.updateUserById(userId, {
              user_metadata: { ...u.user.user_metadata, precisa_senha: false },
            });
          }
        } catch {
          // Falha ao enviar e-mail não pode reverter a liberação do acesso.
          // O cliente ainda pode usar "esqueci a senha" na tela de login.
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
    // erro ao persistir → 500 faz a Asaas reenviar (evt_id ainda NÃO foi gravado,
    // então o reenvio reexecuta a liberação normalmente).
    return new NextResponse("erro ao processar", { status: 500 });
  }

  // marca o evento como processado SÓ agora — depois de liberar/estornar com sucesso.
  if (evt.id) {
    await admin.from("asaas_eventos").insert({ evt_id: evt.id, event: evt.event ?? null });
  }

  return NextResponse.json({ ok: true });
}
