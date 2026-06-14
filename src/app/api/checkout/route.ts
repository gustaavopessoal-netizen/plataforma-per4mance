import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { findOrCreateCustomer, createPayment } from "@/lib/asaas";
import { getProduto } from "@/data/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Cria a cobrança Asaas para o usuário LOGADO e devolve a invoiceUrl.
 * Nada é cobrado aqui — só gera o link. O acesso só é liberado no webhook.
 */
export async function POST(request: Request) {
  // 1) precisa estar logado
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Faça login para comprar." }, { status: 401 });
  }

  // 2) lê o pedido
  let body: { itemId?: string; nome?: string; cpf?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  // 3) produto + PREÇO definidos no servidor (nunca confiar no cliente)
  const produto = getProduto(String(body.itemId ?? ""));
  if (!produto) {
    return NextResponse.json({ error: "Produto inválido." }, { status: 400 });
  }

  // 4) dados exigidos pela Asaas
  const cpf = String(body.cpf ?? "").replace(/\D/g, "");
  if (cpf.length !== 11) {
    return NextResponse.json({ error: "Informe um CPF válido (11 dígitos)." }, { status: 400 });
  }
  const nome = String(body.nome ?? "").trim();
  if (nome.length < 3) {
    return NextResponse.json({ error: "Informe seu nome completo." }, { status: 400 });
  }

  try {
    // guarda nome/cpf no perfil pra não pedir de novo
    await supabase.auth.updateUser({ data: { nome, cpf } });

    const customerId = await findOrCreateCustomer({
      userId: user.id,
      name: nome,
      email: user.email!,
      cpfCnpj: cpf,
    });

    const appUrl = process.env.APP_URL ?? new URL(request.url).origin;
    const externalReference = `${user.id}|${produto.tipo}|${produto.itemId ?? ""}`;

    const { id, invoiceUrl } = await createPayment({
      customerId,
      value: produto.value,
      description: produto.nome,
      externalReference,
      successUrl: `${appUrl}/?compra=ok`,
    });

    // registra a compra como PENDENTE (rastreio). Escrita via service_role.
    const admin = createAdminClient();
    await admin.from("compras").insert({
      user_id: user.id,
      tipo: produto.tipo,
      item_id: produto.itemId,
      asaas_payment_id: id,
      status: "pendente",
    });

    return NextResponse.json({ invoiceUrl });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erro ao criar a cobrança." },
      { status: 500 },
    );
  }
}
