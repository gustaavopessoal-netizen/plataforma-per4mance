import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { findOrCreateCustomer, createPayment } from "@/lib/asaas";
import { getProduto } from "@/data/products";
import { getCupom } from "@/data/cupons";
import { ensureUserByEmail } from "@/lib/conta";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Gera a cobrança Asaas e devolve a invoiceUrl. Nada é cobrado aqui — o acesso
 * só é liberado no webhook, quando o pagamento confirma.
 *
 * Dois caminhos:
 *  - LOGADO (compra dentro da plataforma): usa a sessão.
 *  - VISITANTE (compra vindo da landing): manda `email` + nome + cpf; criamos a
 *    conta automaticamente e o cliente define a senha depois (e-mail no pagamento).
 */
export async function POST(request: Request) {
  // 1) lê o pedido
  let body: { itemId?: string; nome?: string; cpf?: string; email?: string; cupom?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  // 2) produto + PREÇO definidos no servidor (nunca confiar no cliente)
  const produto = getProduto(String(body.itemId ?? ""));
  if (!produto) {
    return NextResponse.json({ error: "Produto inválido." }, { status: 400 });
  }

  // 3) dados exigidos pela Asaas
  const cpf = String(body.cpf ?? "").replace(/\D/g, "");
  if (cpf.length !== 11) {
    return NextResponse.json({ error: "Informe um CPF válido (11 dígitos)." }, { status: 400 });
  }
  const nome = String(body.nome ?? "").trim();
  if (nome.length < 3) {
    return NextResponse.json({ error: "Informe seu nome completo." }, { status: 400 });
  }

  // 4) quem está comprando: usuário logado OU visitante (cria conta pelo e-mail)
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userId: string;
  let userEmail: string;
  let visitante = false;

  try {
    if (user) {
      userId = user.id;
      userEmail = user.email!;
      // guarda nome/cpf no perfil pra não pedir de novo
      await supabase.auth.updateUser({ data: { nome, cpf } });
    } else {
      const email = String(body.email ?? "").trim().toLowerCase();
      if (!EMAIL_RE.test(email)) {
        return NextResponse.json({ error: "Informe um e-mail válido." }, { status: 400 });
      }
      const { userId: uid } = await ensureUserByEmail(email, { nome, cpf });
      userId = uid;
      userEmail = email;
      visitante = true;
    }

    // 5) CUPOM (opcional). Desconto aplicado SÓ no servidor.
    const cupom = getCupom(String(body.cupom ?? ""));
    const admin = createAdminClient();

    // 5a) Cupom de 100% → CORTESIA: libera na hora SEM cobrança no Asaas.
    //     Restrito por segurança: SÓ usuário logado E e-mail na allowlist
    //     (variável de ambiente CUPOM_100_EMAILS, separada por vírgula).
    //     NUNCA pelo fluxo de visitante — senão qualquer um com o código teria tudo de graça.
    if (cupom && cupom.descontoPct >= 100) {
      const autorizados = (process.env.CUPOM_100_EMAILS ?? "")
        .split(",")
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);
      if (visitante || !user || !autorizados.includes(userEmail.toLowerCase())) {
        return NextResponse.json({ error: "Este cupom não está disponível." }, { status: 403 });
      }
      const { error: insErr } = await admin.from("compras").insert({
        user_id: userId,
        tipo: produto.tipo,
        item_id: produto.itemId,
        asaas_payment_id: `cupom-${cupom.codigo}-${userId}-${produto.itemId ?? "colecao"}`,
        status: "confirmado",
      });
      // 23505 = já liberado por este cupom antes → ok, segue como sucesso.
      if (insErr && (insErr as { code?: string }).code !== "23505") throw insErr;
      return NextResponse.json({ liberadoDireto: true });
    }

    // 5b) valor final (metade se cupom de 50%)
    const value = cupom
      ? Math.round(produto.value * (1 - cupom.descontoPct / 100) * 100) / 100
      : produto.value;

    const customerId = await findOrCreateCustomer({
      userId,
      name: nome,
      email: userEmail,
      cpfCnpj: cpf,
    });

    const appUrl = process.env.APP_URL ?? new URL(request.url).origin;
    const externalReference = `${userId}|${produto.tipo}|${produto.itemId ?? ""}`;

    const { id, invoiceUrl } = await createPayment({
      customerId,
      value,
      description: cupom ? `${produto.nome} (cupom ${cupom.codigo} -${cupom.descontoPct}%)` : produto.nome,
      externalReference,
      // depois de pagar, a Asaas devolve o comprador para a plataforma
      successUrl: `${appUrl}/bem-vindo?compra=ok`,
    });

    // registra a compra como PENDENTE (rastreio). Escrita via service_role.
    await admin.from("compras").insert({
      user_id: userId,
      tipo: produto.tipo,
      item_id: produto.itemId,
      asaas_payment_id: id,
      status: "pendente",
    });

    return NextResponse.json({ invoiceUrl, visitante });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erro ao criar a cobrança." },
      { status: 500 },
    );
  }
}
