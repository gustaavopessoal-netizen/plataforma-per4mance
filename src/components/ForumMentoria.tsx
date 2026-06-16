"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

type Post = { id: string; user_id: string; nome: string; texto: string; created_at: string };
type Resp = {
  id: string;
  post_id: string;
  user_id: string;
  nome: string;
  texto: string;
  created_at: string;
};

const quando = (s: string) => new Date(s).toLocaleString("pt-BR");

export function ForumMentoria() {
  const [supabase] = useState(() => createClient());
  const [uid, setUid] = useState<string | null>(null);
  const [nome, setNome] = useState("Aluno");
  const [posts, setPosts] = useState<Post[]>([]);
  const [resps, setResps] = useState<Resp[]>([]);
  const [novo, setNovo] = useState("");
  const [respTxt, setRespTxt] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  const carregar = useCallback(async () => {
    const { data: p } = await supabase
      .from("mentoria_posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    setPosts((p ?? []) as Post[]);
    const { data: r } = await supabase
      .from("mentoria_respostas")
      .select("*")
      .order("created_at", { ascending: true })
      .limit(500);
    setResps((r ?? []) as Resp[]);
  }, [supabase]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const u = data.user;
      if (u) {
        setUid(u.id);
        setNome((u.user_metadata?.nome as string) || u.email || "Aluno");
      }
    });
    carregar();
  }, [supabase, carregar]);

  async function publicar(e: React.FormEvent) {
    e.preventDefault();
    if (!uid || !novo.trim()) return;
    setBusy(true);
    await supabase.from("mentoria_posts").insert({ user_id: uid, nome, texto: novo.trim() });
    setNovo("");
    await carregar();
    setBusy(false);
  }

  async function responder(postId: string) {
    const t = (respTxt[postId] ?? "").trim();
    if (!uid || !t) return;
    await supabase
      .from("mentoria_respostas")
      .insert({ post_id: postId, user_id: uid, nome, texto: t });
    setRespTxt((s) => ({ ...s, [postId]: "" }));
    await carregar();
  }

  async function excluirPost(id: string) {
    if (!confirm("Excluir esta publicação?")) return;
    await supabase.from("mentoria_posts").delete().eq("id", id);
    await carregar();
  }
  async function excluirResp(id: string) {
    await supabase.from("mentoria_respostas").delete().eq("id", id);
    await carregar();
  }

  const inicial = (n: string) => (n || "?").charAt(0).toUpperCase();

  return (
    <div className="space-y-4">
      {/* Nova publicação */}
      <form onSubmit={publicar} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <textarea
          value={novo}
          onChange={(e) => setNovo(e.target.value)}
          placeholder="Compartilhe uma dúvida, ideia ou opinião com o grupo..."
          className="min-h-[70px] w-full resize-y rounded-lg border border-white/10 bg-[#0a0b0f] px-4 py-3 text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-per-laranja"
        />
        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            disabled={busy || !novo.trim()}
            className="rounded-lg bg-per-laranja px-5 py-2 text-sm font-bold text-black transition-transform hover:scale-[1.03] disabled:opacity-60"
          >
            {busy ? "Publicando..." : "Publicar"}
          </button>
        </div>
      </form>

      {posts.length === 0 && (
        <p className="py-6 text-center text-sm text-neutral-500">
          Ainda não há publicações. Seja o primeiro a postar!
        </p>
      )}

      {posts.map((p) => {
        const respostas = resps.filter((r) => r.post_id === p.id);
        return (
          <div key={p.id} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <div className="flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-per-laranja text-sm font-bold text-black">
                {inicial(p.nome)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">{p.nome}</p>
                <p className="text-xs text-neutral-500">{quando(p.created_at)}</p>
                <p className="mt-2 whitespace-pre-wrap text-neutral-100">{p.texto}</p>
              </div>
              {uid === p.user_id && (
                <button
                  onClick={() => excluirPost(p.id)}
                  className="shrink-0 text-xs text-neutral-500 hover:text-red-400"
                >
                  excluir
                </button>
              )}
            </div>

            {/* Respostas */}
            {respostas.length > 0 && (
              <div className="mt-3 space-y-2 border-l border-white/10 pl-4">
                {respostas.map((r) => (
                  <div key={r.id} className="flex items-start gap-2">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/10 text-[10px] font-bold text-neutral-200">
                      {inicial(r.nome)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs">
                        <span className="font-semibold text-neutral-200">{r.nome}</span>{" "}
                        <span className="text-neutral-500">· {quando(r.created_at)}</span>
                      </p>
                      <p className="whitespace-pre-wrap text-sm text-neutral-200">{r.texto}</p>
                    </div>
                    {uid === r.user_id && (
                      <button
                        onClick={() => excluirResp(r.id)}
                        className="shrink-0 text-[10px] text-neutral-600 hover:text-red-400"
                      >
                        excluir
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Responder */}
            <div className="mt-3 flex gap-2">
              <input
                value={respTxt[p.id] ?? ""}
                onChange={(e) => setRespTxt((s) => ({ ...s, [p.id]: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && responder(p.id)}
                placeholder="Responder..."
                className="flex-1 rounded-lg border border-white/10 bg-[#0a0b0f] px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-per-laranja"
              />
              <button
                onClick={() => responder(p.id)}
                disabled={!(respTxt[p.id] ?? "").trim()}
                className="rounded-lg border border-white/15 px-3 py-2 text-sm font-semibold text-neutral-200 transition-colors hover:bg-white/5 disabled:opacity-50"
              >
                Enviar
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
