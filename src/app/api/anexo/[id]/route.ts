import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Download protegido de um anexo: só o dono (ou admin) consegue.
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new NextResponse("Faça login.", { status: 401 });

  const db = createAdminClient();
  const { data: row } = await db
    .from("anexos")
    .select("user_id, path, nome")
    .eq("id", id)
    .single();

  if (!row) return new NextResponse("Não encontrado.", { status: 404 });
  if (row.user_id !== user.id && !isAdmin(user.email)) {
    return new NextResponse("Sem permissão.", { status: 403 });
  }

  const { data, error } = await db.storage
    .from("anexos")
    .createSignedUrl(row.path as string, 60, { download: (row.nome as string) ?? true });
  if (error || !data) return new NextResponse("Arquivo indisponível.", { status: 404 });

  return NextResponse.redirect(data.signedUrl);
}
