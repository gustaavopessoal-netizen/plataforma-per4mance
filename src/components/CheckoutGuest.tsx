"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

/**
 * Formulário de compra que NÃO exige login. Coleta nome + e-mail + CPF, chama
 * /api/checkout (que cria a conta automaticamente) e manda o comprador para o
 * checkout hospedado da Asaas. Se já estiver logado, trava o e-mail da sessão.
 */
export function CheckoutGuest({
  itemId,
  cor = "#1d6fe8",
}: {
  itemId: string;
  cor?: string;
}) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [logado, setLogado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  // Se já houver sessão, pré-preenche e trava o e-mail (compra dentro da plataforma).
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      const meta = (user.user_metadata ?? {}) as { nome?: string; cpf?: string };
      setLogado(true);
      setEmail(user.email ?? "");
      if (meta.nome) setNome(meta.nome);
      if (meta.cpf) setCpf(meta.cpf);
    });
  }, []);

  function fmtCpf(v: string) {
    const d = v.replace(/\D/g, "").slice(0, 11);
    return d
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  async function pagar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, nome, cpf, email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Erro ao iniciar o pagamento.");
      window.location.href = data.invoiceUrl;
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao iniciar o pagamento.");
      setCarregando(false);
    }
  }

  return (
    <form onSubmit={pagar} className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-neutral-300">Nome completo</span>
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome"
          required
          className="w-full rounded-lg border border-white/10 bg-[#0a0b0f] px-4 py-3 text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-per-azul"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-neutral-300">
          E-mail {logado ? "(da sua conta)" : "(será seu login)"}
        </span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@email.com"
          required
          readOnly={logado}
          className={`w-full rounded-lg border border-white/10 bg-[#0a0b0f] px-4 py-3 text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-per-azul ${
            logado ? "opacity-70" : ""
          }`}
        />
        {!logado && (
          <span className="mt-1.5 block text-xs text-neutral-500">
            Criamos seu acesso automaticamente neste e-mail. Depois de pagar, você recebe um link
            para criar sua senha.
          </span>
        )}
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-neutral-300">CPF</span>
        <input
          value={cpf}
          onChange={(e) => setCpf(fmtCpf(e.target.value))}
          inputMode="numeric"
          placeholder="000.000.000-00"
          required
          className="w-full rounded-lg border border-white/10 bg-[#0a0b0f] px-4 py-3 text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-per-azul"
        />
      </label>

      {erro && <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-300">{erro}</p>}

      <button
        type="submit"
        disabled={carregando}
        className="w-full rounded-lg py-3.5 font-bold text-black transition-transform hover:scale-[1.02] disabled:opacity-60"
        style={{ background: cor }}
      >
        {carregando ? "Gerando pagamento..." : "Ir para o pagamento →"}
      </button>

      <p className="text-center text-xs text-neutral-500">
        Pagamento seguro via Asaas — Pix, cartão ou boleto.
      </p>

      {!logado && (
        <p className="text-center text-sm text-neutral-400">
          Já tem conta?{" "}
          <Link href="/login" className="font-semibold text-per-azul hover:underline">
            Entrar
          </Link>
        </p>
      )}
    </form>
  );
}
