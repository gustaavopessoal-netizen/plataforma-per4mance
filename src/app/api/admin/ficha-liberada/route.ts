import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin";
import { protocolos } from "@/data/courses";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Libera (ou trava) MANUALMENTE uma ficha para um aluno. Só ADMIN.
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdmin(user?.email)) {
    return NextResponse.json({ error: "Sem permissão." }, { status: 403 });
  }

  let body: { userId?: string; cursoId?: string; fichaNum?: number; liberar?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const userId = String(body.userId ?? "");
  const cursoId = String(body.cursoId ?? "");
  const fichaNum = Number(body.fichaNum);
  if (!userId || !protocolos.some((c) => c.id === cursoId) || !(fichaNum >= 1 && fichaNum <= 6)) {
    return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  }

  const admin = createAdminClient();
  try {
    if (body.liberar) {
      await admin
        .from("fichas_liberadas")
        .upsert(
          { user_id: userId, curso_id: cursoId, ficha_num: fichaNum },
          { onConflict: "user_id,curso_id,ficha_num" },
        );
    } else {
      await admin
        .from("fichas_liberadas")
        .delete()
        .eq("user_id", userId)
        .eq("curso_id", cursoId)
        .eq("ficha_num", fichaNum);
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erro ao salvar." },
      { status: 500 },
    );
  }
}
