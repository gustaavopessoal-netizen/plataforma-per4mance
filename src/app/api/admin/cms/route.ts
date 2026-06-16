import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin";
import { getCurso } from "@/data/courses";
import { getModulosAdmin } from "@/data/cms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  action: string;
  cursoId: string;
  // genéricos
  id?: string;
  titulo?: string;
  moduloId?: string;
  dir?: "up" | "down";
  video_url?: string;
  descricao?: string;
  publicado?: boolean;
};

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdmin(user?.email)) {
    return NextResponse.json({ error: "Sem permissão." }, { status: 403 });
  }

  let b: Body;
  try {
    b = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const cursoId = String(b.cursoId ?? "");
  // aceita os cursos do catálogo + a área especial "mentoria"
  if (!getCurso(cursoId) && cursoId !== "mentoria") {
    return NextResponse.json({ error: "Área inválida." }, { status: 400 });
  }

  const db = createAdminClient();

  // troca a 'ordem' de um item com o vizinho (reordenar)
  async function mover(tabela: "modulos" | "aulas", filtro: Record<string, string>, id: string, dir: "up" | "down") {
    let q = db.from(tabela).select("id, ordem").order("ordem", { ascending: true });
    for (const [k, v] of Object.entries(filtro)) q = q.eq(k, v);
    const { data } = await q;
    const lista = (data ?? []) as { id: string; ordem: number }[];
    const i = lista.findIndex((x) => x.id === id);
    if (i < 0) return;
    const j = dir === "up" ? i - 1 : i + 1;
    if (j < 0 || j >= lista.length) return;
    await db.from(tabela).update({ ordem: lista[j].ordem }).eq("id", lista[i].id);
    await db.from(tabela).update({ ordem: lista[i].ordem }).eq("id", lista[j].id);
  }

  async function proximaOrdem(tabela: "modulos" | "aulas", coluna: string, valor: string) {
    const { data } = await db.from(tabela).select("ordem").eq(coluna, valor).order("ordem", { ascending: false }).limit(1);
    const max = (data?.[0]?.ordem as number) ?? -1;
    return max + 1;
  }

  try {
    switch (b.action) {
      case "modulo.criar": {
        const ordem = await proximaOrdem("modulos", "curso_id", cursoId);
        await db.from("modulos").insert({ curso_id: cursoId, titulo: (b.titulo ?? "Novo módulo").trim() || "Novo módulo", ordem });
        break;
      }
      case "modulo.renomear":
        await db.from("modulos").update({ titulo: (b.titulo ?? "").trim() || "Módulo" }).eq("id", b.id);
        break;
      case "modulo.excluir":
        await db.from("modulos").delete().eq("id", b.id);
        break;
      case "modulo.mover":
        await mover("modulos", { curso_id: cursoId }, String(b.id), b.dir ?? "up");
        break;
      case "aula.criar": {
        const ordem = await proximaOrdem("aulas", "modulo_id", String(b.moduloId));
        await db.from("aulas").insert({ modulo_id: b.moduloId, titulo: (b.titulo ?? "Nova aula").trim() || "Nova aula", ordem });
        break;
      }
      case "aula.atualizar": {
        const patch: Record<string, unknown> = {};
        if (b.titulo !== undefined) patch.titulo = b.titulo.trim() || "Aula";
        if (b.video_url !== undefined) patch.video_url = b.video_url.trim() || null;
        if (b.descricao !== undefined) patch.descricao = b.descricao;
        if (b.publicado !== undefined) patch.publicado = b.publicado;
        await db.from("aulas").update(patch).eq("id", b.id);
        break;
      }
      case "aula.excluir":
        await db.from("aulas").delete().eq("id", b.id);
        break;
      case "aula.mover":
        await mover("aulas", { modulo_id: String(b.moduloId) }, String(b.id), b.dir ?? "up");
        break;
      default:
        return NextResponse.json({ error: "Ação desconhecida." }, { status: 400 });
    }

    const modulos = await getModulosAdmin(cursoId);
    return NextResponse.json({ ok: true, modulos });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Erro." }, { status: 500 });
  }
}
