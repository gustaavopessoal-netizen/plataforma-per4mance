import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";
import { getAlunos, getVendasEResumo } from "@/data/admin-data";
import { AdminNav } from "@/components/AdminNav";

export const dynamic = "force-dynamic";

export default async function AlunosPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdmin(user?.email)) redirect("/login");

  const [alunos, { vendas }] = await Promise.all([getAlunos(), getVendasEResumo()]);

  // compras confirmadas por e-mail
  const comprasPorEmail = new Map<string, number>();
  for (const v of vendas) {
    if (v.status === "confirmado") {
      comprasPorEmail.set(v.email, (comprasPorEmail.get(v.email) ?? 0) + 1);
    }
  }

  return (
    <main className="min-h-screen bg-[#0a0b0f] px-4 py-10 md:px-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 font-display text-4xl font-extrabold uppercase text-white">Alunos</h1>
        <AdminNav atual="alunos" />

        <p className="mb-4 text-sm text-neutral-400">
          {alunos.length} aluno(s) cadastrado(s).
        </p>

        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.04] text-left text-xs uppercase tracking-wider text-neutral-400">
              <tr>
                <th className="px-4 py-3">Nome</th>
                <th className="px-4 py-3">E-mail</th>
                <th className="px-4 py-3">Cadastro</th>
                <th className="px-4 py-3">Último acesso</th>
                <th className="px-4 py-3">Compras</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {alunos.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-neutral-500">
                    Nenhum aluno cadastrado ainda.
                  </td>
                </tr>
              )}
              {alunos.map((a) => {
                const compras = comprasPorEmail.get(a.email) ?? 0;
                return (
                  <tr key={a.id} className="text-neutral-200">
                    <td className="px-4 py-3">{a.nome || "—"}</td>
                    <td className="px-4 py-3">{a.email}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-neutral-400">
                      {new Date(a.criadoEm).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-neutral-400">
                      {a.ultimoLogin ? new Date(a.ultimoLogin).toLocaleDateString("pt-BR") : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {compras > 0 ? (
                        <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-xs font-bold text-emerald-300">
                          {compras} curso(s)
                        </span>
                      ) : (
                        <span className="text-xs text-neutral-500">nenhuma</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <Link
                        href={`/admin/liberar-fichas/${a.id}`}
                        className="mr-4 text-sm font-semibold text-neutral-300 hover:underline"
                      >
                        🔓 Fichas
                      </Link>
                      <Link
                        href={`/admin/alunos/${a.id}`}
                        className="text-sm font-semibold text-per-azul hover:underline"
                      >
                        Gerenciar →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-neutral-500">
          Em breve: clicar no aluno para trocar senha/e-mail, enviar mensagem e anexar materiais.
        </p>
      </div>
    </main>
  );
}
