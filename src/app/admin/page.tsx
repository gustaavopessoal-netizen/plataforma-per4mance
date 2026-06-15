import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isAdmin } from "@/lib/admin";
import { cursos } from "@/data/courses";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdmin(user?.email)) redirect("/login");

  // quantos módulos já têm vídeo, por curso
  const admin = createAdminClient();
  const counts: Record<string, number> = {};
  try {
    const { data } = await admin.from("modulo_videos").select("curso_id");
    for (const r of (data ?? []) as { curso_id: string }[]) {
      counts[r.curso_id] = (counts[r.curso_id] ?? 0) + 1;
    }
  } catch {
    /* tabela ainda não criada → contagens ficam 0 */
  }

  return (
    <main className="min-h-screen bg-[#0a0b0f] px-4 py-10 md:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-per-laranja">
              Bastidor PER4MANCE
            </p>
            <h1 className="mt-1 font-display text-4xl font-extrabold uppercase text-white">
              Painel do Gustavo
            </h1>
            <p className="mt-1 text-neutral-400">Gerencie os vídeos das aulas de cada protocolo.</p>
          </div>
          <Link
            href="/"
            className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-neutral-200 transition-colors hover:bg-white/5"
          >
            Ver site do aluno →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cursos.map((c) => {
            const feitos = counts[c.id] ?? 0;
            const total = c.modulos.length;
            const completo = feitos >= total;
            return (
              <Link
                key={c.id}
                href={`/admin/curso/${c.id}`}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition-colors hover:bg-white/[0.07]"
              >
                <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md">
                  <Image src={c.capa} alt={c.regiao} fill sizes="48px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-lg font-bold uppercase leading-none text-white">
                    {c.regiao}
                  </p>
                  <p className="mt-1 text-xs text-neutral-400">
                    {feitos}/{total} vídeos
                  </p>
                  <span
                    className={`mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                      completo ? "bg-emerald-500/20 text-emerald-300" : "bg-white/10 text-neutral-300"
                    }`}
                  >
                    {completo ? "Completo" : "Pendente"}
                  </span>
                </div>
                <span className="text-neutral-500 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
