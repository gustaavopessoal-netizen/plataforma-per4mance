"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function GerenciarAluno({ id, emailInicial }: { id: string; emailInicial: string }) {
  const router = useRouter();
  const [email, setEmail] = useState(emailInicial);
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");
  const [feedback, setFeedback] = useState<{ campo: string; ok: boolean; txt: string } | null>(null);
  const [busy, setBusy] = useState("");

  async function acao(action: string, payload: Record<string, unknown>, campo: string, sucesso: string) {
    setBusy(campo);
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/aluno", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, id, ...payload }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Erro.");
      setFeedback({ campo, ok: true, txt: sucesso });
      if (action === "mensagem") setMsg("");
      if (action === "senha") setSenha("");
      router.refresh();
    } catch (e) {
      setFeedback({ campo, ok: false, txt: e instanceof Error ? e.message : "Erro." });
    } finally {
      setBusy("");
    }
  }

  const fb = (campo: string) =>
    feedback?.campo === campo ? (
      <p className={`mt-2 text-xs ${feedback.ok ? "text-emerald-400" : "text-red-400"}`}>
        {feedback.txt}
      </p>
    ) : null;

  const card = "rounded-2xl border border-white/10 bg-white/[0.03] p-5";
  const input =
    "w-full rounded-lg border border-white/10 bg-[#0a0b0f] px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-per-azul";
  const btn =
    "mt-3 rounded-lg bg-per-azul px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.03] disabled:opacity-60";

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* E-mail */}
      <div className={card}>
        <p className="mb-2 font-semibold text-white">Trocar e-mail</p>
        <input className={input} value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
        <button
          className={btn}
          disabled={busy === "email"}
          onClick={() => acao("email", { email }, "email", "E-mail atualizado!")}
        >
          {busy === "email" ? "Salvando..." : "Salvar e-mail"}
        </button>
        {fb("email")}
      </div>

      {/* Senha */}
      <div className={card}>
        <p className="mb-2 font-semibold text-white">Definir nova senha</p>
        <input
          className={input}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          type="text"
          placeholder="nova senha (mín. 6 caracteres)"
        />
        <button
          className={btn}
          disabled={busy === "senha"}
          onClick={() => acao("senha", { password: senha }, "senha", "Senha redefinida!")}
        >
          {busy === "senha" ? "Salvando..." : "Definir senha"}
        </button>
        {fb("senha")}
      </div>

      {/* Mensagem */}
      <div className={`${card} md:col-span-2`}>
        <p className="mb-2 font-semibold text-white">Enviar mensagem (aparece no app do aluno)</p>
        <textarea
          className={`${input} min-h-[90px] resize-y`}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Escreva um aviso ou recado para este aluno..."
        />
        <button
          className={btn}
          disabled={busy === "mensagem"}
          onClick={() => acao("mensagem", { texto: msg }, "mensagem", "Mensagem enviada!")}
        >
          {busy === "mensagem" ? "Enviando..." : "Enviar mensagem"}
        </button>
        {fb("mensagem")}
      </div>
    </div>
  );
}
