import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin";
import { getModulosAdmin } from "@/data/cms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BUCKET = "anexos";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdmin(user?.email)) {
    return NextResponse.json({ error: "Sem permissão." }, { status: 403 });
  }

  let b: { action?: string; aulaId?: string; nome?: string; path?: string; cursoId?: string };
  try {
    b = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const db = createAdminClient();

  try {
    switch (b.action) {
      case "upload-url": {
        try {
          await db.storage.createBucket(BUCKET, { public: false });
        } catch {
          /* já existe */
        }
        const safe = (b.nome ?? "arquivo").replace(/[^\w.\-]+/g, "_");
        const path = `aula/${b.aulaId}/${Date.now()}_${safe}`;
        const { data, error } = await db.storage.from(BUCKET).createSignedUploadUrl(path);
        if (error || !data) throw new Error(error?.message ?? "Falha ao preparar upload.");
        return NextResponse.json({ ok: true, token: data.token, path: data.path });
      }
      case "salvar": {
        await db
          .from("aulas")
          .update({ material_path: b.path, material_nome: b.nome })
          .eq("id", b.aulaId);
        return NextResponse.json({ ok: true, modulos: await getModulosAdmin(String(b.cursoId)) });
      }
      case "remover": {
        const { data: row } = await db
          .from("aulas")
          .select("material_path")
          .eq("id", b.aulaId)
          .single();
        if (row?.material_path) {
          await db.storage.from(BUCKET).remove([row.material_path as string]);
        }
        await db
          .from("aulas")
          .update({ material_path: null, material_nome: null })
          .eq("id", b.aulaId);
        return NextResponse.json({ ok: true, modulos: await getModulosAdmin(String(b.cursoId)) });
      }
      default:
        return NextResponse.json({ error: "Ação desconhecida." }, { status: 400 });
    }
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Erro." }, { status: 500 });
  }
}
