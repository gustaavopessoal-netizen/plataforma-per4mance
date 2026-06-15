import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";
import { cursos, formatBRL } from "@/data/courses";
import { getVendasEResumo } from "@/data/admin-data";
import { AdminNav } from "@/components/AdminNav";

export const dynamic = "force-dynamic";

function Kpi({ label, valor, cor }: { label: string; valor: string; cor?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">{label}</p>
      <p className="mt-2 font-display text-3xl font-extrabold" style={{ color: cor ?? "#fff" }}>
        {valor}
      </p>
    </div>
  );
}

export default async function AdminHome() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdmin(user?.email)) redirect("/login");

  const { resumo } = await getVendasEResumo();

  return (
    <main className="min-h-screen bg-[#0a0b0f] px-4 py-10 md:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-widest text-per-laranja">
          Bastidor PER4MANCE
        </p>
        <h1 className="mb-6 mt-1 font-display text-4xl font-extrabold uppercase text-white">
          Painel do Gustavo
        </h1>

        <AdminNav atual="painel" />

        {/* KPIs */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Kpi label="Faturamento" valor={formatBRL(resumo.faturamento)} cor="#22c55e" />
          <Kpi label="Vendas" valor={String(resumo.vendasConfirmadas)} />
          <Kpi label="Alunos" valor={String(resumo.alunos)} />
          <Kpi label="Pendentes" valor={String(resumo.pendentes)} cor="#f5c518" />
        </div>

        <div className="mt-4 flex gap-3">
          <Link href="/admin/vendas" className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-neutral-200 transition-colors hover:bg-white/5">
            Ver vendas →
          </Link>
          <Link href="/admin/alunos" className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-neutral-200 transition-colors hover:bg-white/5">
            Ver alunos →
          </Link>
        </div>

        {/* Conteúdo dos cursos */}
        <h2 className="mb-3 mt-10 font-display text-2xl font-bold uppercase text-white">
          Conteúdo dos cursos
        </h2>
        <p className="mb-4 text-sm text-neutral-400">
          Clique num protocolo para criar módulos, aulas e anexar os vídeos.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {cursos.map((c) => (
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
                <p className="mt-1 text-xs text-neutral-400">{formatBRL(c.preco)}</p>
              </div>
              <span className="text-neutral-500 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
