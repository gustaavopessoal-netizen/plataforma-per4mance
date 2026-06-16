import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAcessos } from "@/data/entitlements";
import { cursoLiberado } from "@/data/access";
import { isAdmin } from "@/lib/admin";
import { isMentor } from "@/data/mentoria";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Download do material de uma aula: só quem tem o curso (ou admin).
export async function GET(_request: Request, { params }: { params: Promise<{ aulaId: string }> }) {
  const { aulaId } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new NextResponse("Faça login.", { status: 401 });

  const db = createAdminClient();
  const { data: aula } = await db
    .from("aulas")
    .select("material_path, material_nome, modulo_id")
    .eq("id", aulaId)
    .single();
  if (!aula?.material_path) return new NextResponse("Material não encontrado.", { status: 404 });

  const { data: mod } = await db
    .from("modulos")
    .select("curso_id")
    .eq("id", aula.modulo_id as string)
    .single();
  const cursoId = (mod?.curso_id as string) ?? "";

  const acessos = await getAcessos();
  const permitido =
    cursoId === "mentoria" ? await isMentor(user.id) : cursoLiberado(acessos, cursoId);
  if (!permitido && !isAdmin(user.email)) {
    return new NextResponse("Sem acesso a este material.", { status: 403 });
  }

  const { data, error } = await db.storage
    .from("anexos")
    .createSignedUrl(aula.material_path as string, 60, {
      download: (aula.material_nome as string) ?? true,
    });
  if (error || !data) return new NextResponse("Arquivo indisponível.", { status: 404 });

  return NextResponse.redirect(data.signedUrl);
}
