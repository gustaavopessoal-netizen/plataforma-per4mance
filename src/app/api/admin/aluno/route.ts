import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Gestão de um aluno (só admin): trocar e-mail, definir senha, enviar mensagem.
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdmin(user?.email)) {
    return NextResponse.json({ error: "Sem permissão." }, { status: 403 });
  }

  let b: { action?: string; id?: string; email?: string; password?: string; texto?: string };
  try {
    b = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const alunoId = String(b.id ?? "");
  if (!alunoId) return NextResponse.json({ error: "Aluno inválido." }, { status: 400 });

  const db = createAdminClient();

  try {
    switch (b.action) {
      case "email": {
        const email = String(b.email ?? "").trim();
        if (!email.includes("@")) return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
        const { error } = await db.auth.admin.updateUserById(alunoId, { email, email_confirm: true });
        if (error) throw new Error(error.message);
        break;
      }
      case "senha": {
        const password = String(b.password ?? "");
        if (password.length < 6) return NextResponse.json({ error: "A senha precisa de ao menos 6 caracteres." }, { status: 400 });
        const { error } = await db.auth.admin.updateUserById(alunoId, { password });
        if (error) throw new Error(error.message);
        break;
      }
      case "mensagem": {
        const texto = String(b.texto ?? "").trim();
        if (!texto) return NextResponse.json({ error: "Escreva a mensagem." }, { status: 400 });
        const { error } = await db.from("mensagens").insert({ user_id: alunoId, texto });
        if (error) throw new Error(error.message);
        break;
      }
      case "excluir": {
        // não deixa excluir um admin (proteção)
        const { data: alvo } = await db.auth.admin.getUserById(alunoId);
        if (isAdmin(alvo?.user?.email)) {
          return NextResponse.json({ error: "Não é possível excluir um administrador." }, { status: 400 });
        }
        const { error } = await db.auth.admin.deleteUser(alunoId);
        if (error) throw new Error(error.message);
        break;
      }
      default:
        return NextResponse.json({ error: "Ação desconhecida." }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Erro." }, { status: 500 });
  }
}
