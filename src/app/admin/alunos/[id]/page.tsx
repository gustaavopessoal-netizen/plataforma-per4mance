import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";
import { getAluno, getComprasDoAluno, getMensagensDoAluno, getAnexosDoAluno } from "@/data/admin-data";
import { GerenciarAluno } from "@/components/GerenciarAluno";
import { AnexosAluno } from "@/components/AnexosAluno";

export const dynamic = "force-dynamic";

export default async function AlunoDetalhePage({
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

  const aluno = await getAluno(id);
  if (!aluno) notFound();

  const [compras, mensagens, anexos] = await Promise.all([
    getComprasDoAluno(id),
    getMensagensDoAluno(id),
    getAnexosDoAluno(id),
  ]);

  return (
    <main className="min-h-screen bg-[#0a0b0f] px-4 py-10 md:px-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/admin/alunos"
          className="mb-6 inline-flex items-center gap-1 text-sm text-neutral-400 transition-colors hover:text-white"
        >
          ← Voltar aos alunos
        </Link>

        <h1 className="font-display text-3xl font-extrabold uppercase text-white">
          {aluno.nome || aluno.email}
        </h1>
        <p className="mt-1 text-sm text-neutral-400">
          {aluno.email} · cadastrado em {new Date(aluno.criadoEm).toLocaleDateString("pt-BR")}
        </p>

        {/* Compras do aluno */}
        <div className="mt-8">
          <h2 className="mb-3 font-display text-xl font-bold uppercase text-white">Compras</h2>
          {compras.length === 0 ? (
            <p className="text-sm text-neutral-500">Este aluno ainda não comprou nada.</p>
          ) : (
            <ul className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10">
              {compras.map((c, i) => (
                <li key={i} className="flex items-center justify-between p-3 text-sm">
                  <span className="text-neutral-200">{c.produto}</span>
                  <span className="text-xs text-neutral-400">
                    {c.status} · {new Date(c.data).toLocaleDateString("pt-BR")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Gestão */}
        <div className="mt-8">
          <h2 className="mb-3 font-display text-xl font-bold uppercase text-white">Gerenciar</h2>
          <GerenciarAluno id={aluno.id} emailInicial={aluno.email} />
        </div>

        {/* Anexos / adendos */}
        <div className="mt-4">
          <AnexosAluno userId={aluno.id} inicial={anexos} />
        </div>

        {/* Histórico de mensagens enviadas */}
        <div className="mt-8">
          <h2 className="mb-3 font-display text-xl font-bold uppercase text-white">
            Mensagens enviadas
          </h2>
          {mensagens.length === 0 ? (
            <p className="text-sm text-neutral-500">Nenhuma mensagem enviada ainda.</p>
          ) : (
            <ul className="space-y-2">
              {mensagens.map((m) => (
                <li key={m.id} className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                  <p className="text-sm text-neutral-200">{m.texto}</p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {new Date(m.created_at).toLocaleString("pt-BR")} ·{" "}
                    {m.lida ? "lida" : "não lida"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
