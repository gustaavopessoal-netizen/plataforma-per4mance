import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Liberações MANUAIS de fichas de um aluno (visão admin, service_role).
 * Retorna { curso_id: [nums] }. Nunca lança: erro / tabela ausente → {}.
 */
export async function getLiberacoesManuais(userId: string): Promise<Record<string, number[]>> {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("fichas_liberadas")
      .select("curso_id, ficha_num")
      .eq("user_id", userId);
    if (error || !data) return {};
    const map: Record<string, number[]> = {};
    for (const r of data as { curso_id: string; ficha_num: number }[]) {
      (map[r.curso_id] ??= []).push(r.ficha_num);
    }
    return map;
  } catch {
    return {};
  }
}
