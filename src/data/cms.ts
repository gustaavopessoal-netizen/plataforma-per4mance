import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export type AulaCMS = {
  id: string;
  modulo_id: string;
  titulo: string;
  descricao: string | null;
  video_url: string | null;
  ordem: number;
  publicado: boolean;
  material_path?: string | null;
  material_nome?: string | null;
};

export type ModuloCMS = {
  id: string;
  curso_id: string;
  titulo: string;
  ordem: number;
  aulas: AulaCMS[];
};

// Lê módulos + aulas de um curso. Nunca lança (sem tabela/erro → []).
async function lerModulos(cursoId: string): Promise<ModuloCMS[]> {
  try {
    const admin = createAdminClient();
    const { data: mods, error } = await admin
      .from("modulos")
      .select("id, curso_id, titulo, ordem")
      .eq("curso_id", cursoId)
      .order("ordem", { ascending: true });
    if (error || !mods) return [];

    const ids = mods.map((m) => m.id);
    let aulas: AulaCMS[] = [];
    if (ids.length) {
      const { data: a } = await admin
        .from("aulas")
        .select(
          "id, modulo_id, titulo, descricao, video_url, ordem, publicado, material_path, material_nome",
        )
        .in("modulo_id", ids)
        .order("ordem", { ascending: true });
      aulas = (a ?? []) as AulaCMS[];
    }
    return (mods as Omit<ModuloCMS, "aulas">[]).map((m) => ({
      ...m,
      aulas: aulas.filter((x) => x.modulo_id === m.id),
    }));
  } catch {
    return [];
  }
}

// ADMIN: tudo (rascunhos inclusive, com video_url).
export async function getModulosAdmin(cursoId: string): Promise<ModuloCMS[]> {
  return lerModulos(cursoId);
}

// ALUNO: só aulas PUBLICADAS; o video_url só vai junto se o aluno tem acesso.
export async function getModulosPublicos(
  cursoId: string,
  liberado: boolean,
): Promise<ModuloCMS[]> {
  const mods = await lerModulos(cursoId);
  return mods
    .map((m) => ({
      ...m,
      aulas: m.aulas
        .filter((a) => a.publicado)
        .map((a) => ({
          ...a,
          video_url: liberado ? a.video_url : null,
          material_path: null, // nunca expõe o caminho; download é por rota protegida
        })),
    }))
    .filter((m) => m.aulas.length > 0);
}
