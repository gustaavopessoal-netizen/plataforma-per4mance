import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";
import { getModulosAdmin } from "@/data/cms";
import { AdminCMS } from "@/components/AdminCMS";

export const dynamic = "force-dynamic";

export default async function AdminMentoria() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdmin(user?.email)) redirect("/login");

  const modulos = await getModulosAdmin("mentoria");

  return (
    <main className="min-h-screen bg-[#0a0b0f] px-4 py-10 md:px-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/admin"
          className="mb-6 inline-flex items-center gap-1 text-sm text-neutral-400 transition-colors hover:text-white"
        >
          ← Voltar ao painel
        </Link>

        <span className="rounded bg-per-laranja px-2 py-1 text-xs font-extrabold uppercase tracking-widest text-black">
          Mentoria
        </span>
        <h1 className="mt-2 font-display text-4xl font-extrabold uppercase text-white">
          Conteúdo da Mentoria
        </h1>
        <p className="mt-2 max-w-2xl text-neutral-400">
          Crie módulos e aulas exclusivos (videoaulas, lives gravadas). Cole o link do vídeo e o
          material de cada aula. Só quem você liberou (aba <strong className="text-neutral-200">Alunos</strong>) assiste.
        </p>

        <div className="mt-8">
          <AdminCMS cursoId="mentoria" inicial={modulos} cor="#f26d40" />
        </div>
      </div>
    </main>
  );
}
