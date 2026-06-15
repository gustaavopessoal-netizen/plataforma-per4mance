import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

// E-books vinculados a um curso (ids). Nunca lança.
export async function getEbookIdsDoCurso(cursoId: string): Promise<string[]> {
  try {
    const db = createAdminClient();
    const { data } = await db.from("curso_ebooks").select("ebook_id").eq("curso_id", cursoId);
    return ((data ?? []) as { ebook_id: string }[]).map((r) => r.ebook_id);
  } catch {
    return [];
  }
}

// Cursos aos quais um e-book está vinculado (usado para liberar o download).
export async function getCursoIdsDoEbook(ebookId: string): Promise<string[]> {
  try {
    const db = createAdminClient();
    const { data } = await db.from("curso_ebooks").select("curso_id").eq("ebook_id", ebookId);
    return ((data ?? []) as { curso_id: string }[]).map((r) => r.curso_id);
  } catch {
    return [];
  }
}
