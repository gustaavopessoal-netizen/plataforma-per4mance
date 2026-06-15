import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";
import { formatBRL } from "@/data/courses";
import { getVendasEResumo } from "@/data/admin-data";
import { AdminNav } from "@/components/AdminNav";

export const dynamic = "force-dynamic";

const STATUS: Record<string, { txt: string; cls: string }> = {
  confirmado: { txt: "Confirmado", cls: "bg-emerald-500/15 text-emerald-300" },
  pendente: { txt: "Pendente", cls: "bg-yellow-500/15 text-yellow-300" },
  estornado: { txt: "Estornado", cls: "bg-red-500/15 text-red-300" },
};

export default async function VendasPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isAdmin(user?.email)) redirect("/login");

  const { vendas, resumo } = await getVendasEResumo();

  return (
    <main className="min-h-screen bg-[#0a0b0f] px-4 py-10 md:px-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-6 font-display text-4xl font-extrabold uppercase text-white">Vendas</h1>
        <AdminNav atual="vendas" />

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Faturamento</p>
            <p className="mt-2 font-display text-3xl font-extrabold text-emerald-400">{formatBRL(resumo.faturamento)}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Confirmadas</p>
            <p className="mt-2 font-display text-3xl font-extrabold text-white">{resumo.vendasConfirmadas}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Pendentes</p>
            <p className="mt-2 font-display text-3xl font-extrabold text-yellow-300">{resumo.pendentes}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Estornos</p>
            <p className="mt-2 font-display text-3xl font-extrabold text-red-300">{resumo.estornos}</p>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.04] text-left text-xs uppercase tracking-wider text-neutral-400">
              <tr>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Aluno</th>
                <th className="px-4 py-3">Produto</th>
                <th className="px-4 py-3">Valor</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {vendas.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-neutral-500">
                    Nenhuma venda ainda. Quando alguém comprar, aparece aqui.
                  </td>
                </tr>
              )}
              {vendas.map((v) => {
                const s = STATUS[v.status] ?? { txt: v.status, cls: "bg-white/10 text-neutral-300" };
                return (
                  <tr key={v.id} className="text-neutral-200">
                    <td className="whitespace-nowrap px-4 py-3 text-neutral-400">
                      {new Date(v.data).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3">{v.email}</td>
                    <td className="px-4 py-3">{v.produto}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-semibold">{formatBRL(v.valor)}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded px-2 py-0.5 text-xs font-bold ${s.cls}`}>{s.txt}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
