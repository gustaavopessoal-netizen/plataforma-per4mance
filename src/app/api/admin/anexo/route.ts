import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin";
import { getAnexosDoAluno } from "@/data/admin-data";

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

  let b: { action?: string; userId?: string; nome?: string; path?: string; id?: string };
  try {
    b = await request.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  const db = createAdminClient();

  try {
    switch (b.action) {
      case "upload-url": {
        // garante o bucket (privado) — ignora se já existe
        try {
          await db.storage.createBucket(BUCKET, { public: false });
        } catch {
          /* já existe */
        }
        const safe = (b.nome ?? "arquivo").replace(/[^\w.\-]+/g, "_");
        const path = `${b.userId}/${Date.now()}_${safe}`;
        const { data, error } = await db.storage.from(BUCKET).createSignedUploadUrl(path);
        if (error || !data) throw new Error(error?.message ?? "Falha ao preparar upload.");
        return NextResponse.json({ ok: true, token: data.token, path: data.path });
      }
      case "registrar": {
        if (!b.userId || !b.path || !b.nome)
          return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
        await db.from("anexos").insert({ user_id: b.userId, nome: b.nome, path: b.path });
        return NextResponse.json({ ok: true, anexos: await getAnexosDoAluno(b.userId) });
      }
      case "excluir": {
        const { data: row } = await db
          .from("anexos")
          .select("path, user_id")
          .eq("id", b.id)
          .single();
        if (row) {
          await db.storage.from(BUCKET).remove([row.path as string]);
          await db.from("anexos").delete().eq("id", b.id);
          return NextResponse.json({ ok: true, anexos: await getAnexosDoAluno(row.user_id as string) });
        }
        return NextResponse.json({ ok: true, anexos: [] });
      }
      default:
        return NextResponse.json({ error: "Ação desconhecida." }, { status: 400 });
    }
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Erro." }, { status: 500 });
  }
}
