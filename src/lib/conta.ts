import "server-only";
import { createClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Provisionamento de conta para compra de VISITANTE (sem login prévio).
 *
 * Fluxo "comprou → ganhou conta": o comprador vem da landing, NÃO tem conta.
 * Ao iniciar o checkout criamos (ou reaproveitamos) a conta pelo e-mail dele,
 * SEM senha. A senha o próprio cliente define depois, pelo link que enviamos no
 * e-mail QUANDO O PAGAMENTO É CONFIRMADO (ver webhook do Asaas).
 */

/**
 * Garante que existe um usuário para este e-mail e devolve o id.
 * - Se não existe: cria (e-mail já confirmado, sem senha) e marca
 *   `precisa_senha: true` para o webhook saber que deve mandar o e-mail.
 * - Se já existe: reaproveita (pega o id via generateLink, sem enviar nada).
 */
export async function ensureUserByEmail(
  email: string,
  meta: { nome?: string; cpf?: string },
): Promise<{ userId: string; novo: boolean }> {
  const admin = createAdminClient();
  const emailNorm = email.trim().toLowerCase();

  const { data, error } = await admin.auth.admin.createUser({
    email: emailNorm,
    email_confirm: true,
    user_metadata: { nome: meta.nome, cpf: meta.cpf, precisa_senha: true },
  });
  if (!error && data?.user) {
    return { userId: data.user.id, novo: true };
  }

  // Já existe (ou createUser falhou): tenta recuperar o id pelo generateLink.
  // 'recovery' devolve o objeto `user` sem disparar e-mail (só gera o link).
  const { data: link } = await admin.auth.admin.generateLink({
    type: "recovery",
    email: emailNorm,
  });
  if (link?.user?.id) {
    return { userId: link.user.id, novo: false };
  }

  throw new Error(error?.message ?? "Não foi possível criar a conta para este e-mail.");
}

/**
 * Dispara o e-mail "crie sua senha de acesso" usando o SMTP do Supabase
 * (template de recuperação de senha). O link cai em /definir-senha.
 *
 * ⚠️ Go-live: configurar SMTP próprio no Supabase (Auth → Emails) e adicionar
 * APP_URL + "/definir-senha" às Redirect URLs (Auth → URL Configuration).
 */
export async function enviarEmailDefinirSenha(email: string): Promise<void> {
  const anon = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
  const appUrl = process.env.APP_URL ?? "https://plataforma-per4mance.vercel.app";
  await anon.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
    redirectTo: `${appUrl}/definir-senha`,
  });
}
