import { redirect } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { createClient } from "@/lib/supabase/server";
import { isMentor } from "@/data/mentoria";

export const dynamic = "force-dynamic";

export default async function ContaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const mentor = await isMentor(user.id);

  // RLS já garante que só vêm os dados deste usuário.
  let mensagens: { id: string; texto: string; created_at: string }[] = [];
  let anexos: { id: string; nome: string }[] = [];
  try {
    const { data } = await supabase
      .from("mensagens")
      .select("id, texto, created_at")
      .order("created_at", { ascending: false });
    mensagens = (data ?? []) as typeof mensagens;
  } catch {
    mensagens = [];
  }
  try {
    const { data } = await supabase
      .from("anexos")
      .select("id, nome")
      .order("created_at", { ascending: false });
    anexos = (data ?? []) as typeof anexos;
  } catch {
    anexos = [];
  }

  return (
    <main className="min-h-screen bg-[#0a0b0f]">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-28 md:px-6">
        <h1 className="font-display text-4xl font-extrabold uppercase text-white">Minha conta</h1>
        <p className="mt-1 text-neutral-400">{user.email}</p>

        {mentor && (
          <Link
            href="/mentoria"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-per-laranja px-5 py-3 font-bold text-black transition-transform hover:scale-[1.02]"
          >
            🎓 Acessar a Mentoria
          </Link>
        )}

        <h2 className="mb-3 mt-10 font-display text-2xl font-bold uppercase text-white">
          Mensagens
        </h2>
        {mensagens.length === 0 ? (
          <p className="text-neutral-500">Você não tem mensagens no momento.</p>
        ) : (
          <ul className="space-y-3">
            {mensagens.map((m) => (
              <li key={m.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="whitespace-pre-wrap text-neutral-100">{m.texto}</p>
                <p className="mt-2 text-xs text-neutral-500">
                  {new Date(m.created_at).toLocaleString("pt-BR")}
                </p>
              </li>
            ))}
          </ul>
        )}

        <h2 className="mb-3 mt-10 font-display text-2xl font-bold uppercase text-white">
          Meus materiais
        </h2>
        {anexos.length === 0 ? (
          <p className="text-neutral-500">Nenhum material disponível.</p>
        ) : (
          <ul className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10">
            {anexos.map((a) => (
              <li key={a.id} className="p-3">
                <a
                  href={`/api/anexo/${a.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-neutral-100 hover:text-per-azul"
                >
                  <span>📎</span>
                  <span className="truncate">{a.nome}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
