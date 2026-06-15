import { redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function ContaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // RLS já garante que só vêm as mensagens deste usuário.
  let mensagens: { id: string; texto: string; created_at: string }[] = [];
  try {
    const { data } = await supabase
      .from("mensagens")
      .select("id, texto, created_at")
      .order("created_at", { ascending: false });
    mensagens = (data ?? []) as typeof mensagens;
  } catch {
    mensagens = [];
  }

  return (
    <main className="min-h-screen bg-[#0a0b0f]">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-28 md:px-6">
        <h1 className="font-display text-4xl font-extrabold uppercase text-white">Minha conta</h1>
        <p className="mt-1 text-neutral-400">{user.email}</p>

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
      </div>
    </main>
  );
}
