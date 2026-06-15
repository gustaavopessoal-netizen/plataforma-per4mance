import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin";
import { getCurso } from "@/data/courses";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Salva (ou remove) o link do vídeo de um módulo. Só ADMIN.
export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdmin(user?.email)) {
    return NextResponse.json({ error: "Sem permissão." }, { status: 403 });
  }

  let body: { cursoId?: string; moduloNum?: number; videoUrl?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const curso = getCurso(String(body.cursoId ?? ""));
  if (!curso) return NextResponse.json({ error: "Curso inválido." }, { status: 400 });

  const moduloNum = Number(body.moduloNum);
  if (!curso.modulos.some((m) => m.num === moduloNum)) {
    return NextResponse.json({ error: "Módulo inválido." }, { status: 400 });
  }

  const videoUrl = String(body.videoUrl ?? "").trim();
  const admin = createAdminClient();

  try {
    if (!videoUrl) {
      // campo vazio → remove o vídeo do módulo
      await admin
        .from("modulo_videos")
        .delete()
        .eq("curso_id", curso.id)
        .eq("modulo_num", moduloNum);
      return NextResponse.json({ ok: true, removido: true });
    }

    await admin.from("modulo_videos").upsert(
      { curso_id: curso.id, modulo_num: moduloNum, video_url: videoUrl, updated_at: new Date().toISOString() },
      { onConflict: "curso_id,modulo_num" },
    );
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Erro ao salvar." },
      { status: 500 },
    );
  }
}
