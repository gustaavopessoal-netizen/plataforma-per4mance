import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";
import { getCurso } from "@/data/courses";
import { getVideosDoCurso } from "@/data/videos";
import { EditorVideos } from "@/components/EditorVideos";

export const dynamic = "force-dynamic";

export default async function AdminCursoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdmin(user?.email)) redirect("/login");

  const curso = getCurso(id);
  if (!curso) notFound();

  const videos = await getVideosDoCurso(curso.id);

  return (
    <main className="min-h-screen bg-[#0a0b0f] px-4 py-10 md:px-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/admin"
          className="mb-6 inline-flex items-center gap-1 text-sm text-neutral-400 transition-colors hover:text-white"
        >
          ← Voltar ao painel
        </Link>

        <div className="mb-2 flex items-center gap-2">
          <span
            className="rounded px-2 py-1 text-xs font-extrabold uppercase tracking-widest text-black"
            style={{ background: curso.cor }}
          >
            Protocolo {curso.num}
          </span>
        </div>
        <h1 className="font-display text-4xl font-extrabold uppercase text-white">
          {curso.regiao} <span style={{ color: curso.cor }}>{curso.tagline}</span>
        </h1>
        <p className="mt-2 max-w-2xl text-neutral-400">
          Cole o link do <strong className="text-neutral-200">Panda Video</strong> de cada módulo e
          clique em Salvar. Deixe em branco e salve para remover. O aluno que comprou já assiste na
          hora.
        </p>

        <div className="mt-8">
          <EditorVideos
            cursoId={curso.id}
            modulos={curso.modulos}
            videosIniciais={videos}
            cor={curso.cor}
          />
        </div>
      </div>
    </main>
  );
}
