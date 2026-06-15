import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Lê os vídeos (links Panda) de um curso. Server-only (usa service_role).
 * O vídeo só é REPASSADO ao player quando o aluno tem acesso (gate na página).
 * Nunca lança: erro/sem-tabela → mapa vazio.
 */
export async function getVideosDoCurso(cursoId: string): Promise<Record<number, string>> {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("modulo_videos")
      .select("modulo_num, video_url")
      .eq("curso_id", cursoId);
    if (error || !data) return {};
    const mapa: Record<number, string> = {};
    for (const r of data as { modulo_num: number; video_url: string }[]) {
      mapa[r.modulo_num] = r.video_url;
    }
    return mapa;
  } catch {
    return {};
  }
}
