import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

// O usuário é membro da Mentoria? (lido via service_role). Nunca lança.
export async function isMentor(userId: string): Promise<boolean> {
  if (!userId) return false;
  try {
    const db = createAdminClient();
    const { data } = await db
      .from("mentoria_membros")
      .select("user_id")
      .eq("user_id", userId)
      .maybeSingle();
    return !!data;
  } catch {
    return false;
  }
}
