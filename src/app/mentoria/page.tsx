import Link from "next/link";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { createClient } from "@/lib/supabase/server";
import { isMentor } from "@/data/mentoria";
import { getModulosPublicos } from "@/data/cms";
import { ConteudoCurso } from "@/components/ConteudoCurso";
import { ForumMentoria } from "@/components/ForumMentoria";

export const dynamic = "force-dynamic";

export default async function MentoriaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const mentor = await isMentor(user.id);
  const modulos = mentor ? await getModulosPublicos("mentoria", true) : [];

  return (
    <main className="min-h-screen bg-[#0a0b0f]">
      <Navbar />
      <div className="mx-auto max-w-[1500px] px-4 pb-16 pt-28 md:px-12">
        <span className="rounded bg-per-laranja px-2 py-1 text-xs font-extrabold uppercase tracking-widest text-black">
          Mentoria PER4MANCE
        </span>
        <h1 className="mt-3 font-display text-5xl font-extrabold uppercase leading-none text-white md:text-6xl">
          Área da Mentoria
        </h1>

        {!mentor ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
            <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-full bg-black/60 text-white ring-2 ring-white/20">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="11" width="16" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
              </svg>
            </div>
            <p className="font-display text-2xl font-bold uppercase text-white">Acesso exclusivo</p>
            <p className="mx-auto mt-2 max-w-md text-neutral-400">
              A Mentoria é liberada manualmente após a contratação. Fale com o Gustavo para entrar.
            </p>
            <Link
              href="/"
              className="mt-5 inline-block rounded-lg border border-white/15 px-5 py-2.5 text-sm font-semibold text-neutral-200 transition-colors hover:bg-white/5"
            >
              Voltar à plataforma
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-8">
              <ConteudoCurso modulos={modulos} liberado={true} cor="#f26d40" />
            </div>
            <div className="mt-12">
              <h2 className="mb-1 font-display text-3xl font-extrabold uppercase text-white">
                Grupo da Mentoria
              </h2>
              <p className="mb-4 text-sm text-neutral-400">
                Tire dúvidas e troque ideias com os outros mentorados.
              </p>
              <ForumMentoria />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
