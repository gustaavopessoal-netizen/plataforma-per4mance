import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin";
import { getCurso } from "@/data/courses";
import { ebooks } from "@/data/ebooks";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Define QUAIS e-books pertencem a um curso (substitui a lista). Só admin.
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdmin(user?.email)) {
    return NextResponse.json({ error: "Sem permissão." }, { status: 403 });
  }

  let b: { cursoId?: string; ebookIds?: string[] };
  try {
    b = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const curso = getCurso(String(b.cursoId ?? ""));
  if (!curso) return NextResponse.json({ error: "Curso inválido." }, { status: 400 });

  const validos = new Set(ebooks.map((e) => e.id));
  const ids = (b.ebookIds ?? []).filter((id) => validos.has(id));

  const db = createAdminClient();
  try {
    await db.from("curso_ebooks").delete().eq("curso_id", curso.id);
    if (ids.length) {
      await db.from("curso_ebooks").insert(ids.map((eid) => ({ curso_id: curso.id, ebook_id: eid })));
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Erro." }, { status: 500 });
  }
}
