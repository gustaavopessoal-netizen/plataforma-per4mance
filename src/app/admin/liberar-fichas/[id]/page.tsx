import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";
import { getAluno } from "@/data/admin-data";
import { getLiberacoesManuais } from "@/data/admin-fichas";
import { GerenciarFichas } from "@/components/GerenciarFichas";

export const dynamic = "force-dynamic";

// Painel do admin para liberar fichas MANUALMENTE a um aluno (fora do drip de 15 dias).
export default async function LiberarFichasPage({
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

  const liberacoes = await getLiberacoesManuais(id);

  return (
    <main className="min-h-screen bg-[#0a0b0f] px-4 py-10 md:px-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/admin/alunos"
          className="mb-6 inline-flex items-center gap-1 text-sm text-neutral-400 transition-colors hover:text-white"
        >
          ← Voltar aos alunos
        </Link>

        <h1 className="font-display text-3xl font-extrabold uppercase text-white">Liberar fichas</h1>
        <p className="mt-1 text-sm text-neutral-400">{aluno.nome || aluno.email}</p>

        <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <p className="mb-4 text-sm text-neutral-300">
            As fichas abrem sozinhas: <b className="text-white">Ficha 1 na compra</b> e{" "}
            <b className="text-white">+1 a cada 15 dias</b>. Aqui você pode liberar alguma na mão,
            antes do prazo.
          </p>
          <GerenciarFichas userId={aluno.id} inicial={liberacoes} />
        </div>
      </div>
    </main>
  );
}
