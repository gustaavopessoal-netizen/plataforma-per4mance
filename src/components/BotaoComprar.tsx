"use client";

import { useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function BotaoComprar({
  itemId,
  label = "Comprar agora",
  className = "",
  style,
}: {
  itemId: string;
  label?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const router = useRouter();
  const [aberto, setAberto] = useState(false);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  // Ao clicar: precisa estar logado. Se estiver, abre o modal (pré-preenchido).
  async function aoClicar() {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }
    const meta = (user.user_metadata ?? {}) as { nome?: string; cpf?: string };
    setNome(meta.nome ?? "");
    setCpf(meta.cpf ?? "");
    setErro(null);
    setAberto(true);
  }

  async function pagar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setCarregando(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, nome, cpf }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Erro ao iniciar o pagamento.");
      // vai para o checkout hospedado da Asaas
      window.location.href = data.invoiceUrl;
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao iniciar o pagamento.");
      setCarregando(false);
    }
  }

  return (
    <>
      <button onClick={aoClicar} className={className} style={style}>
        {label}
      </button>

      {aberto && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => !carregando && setAberto(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#11131a] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-2xl font-extrabold uppercase text-white">
              Finalizar compra
            </h3>
            <p className="mt-1 text-sm text-neutral-400">
              Confirme seus dados para gerar o pagamento (Pix, cartão ou boleto).
            </p>

            <form onSubmit={pagar} className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-neutral-300">
                  Nome completo
                </span>
                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  required
                  className="w-full rounded-lg border border-white/10 bg-[#0a0b0f] px-4 py-3 text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-per-azul"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-neutral-300">CPF</span>
                <input
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  inputMode="numeric"
                  placeholder="000.000.000-00"
                  required
                  className="w-full rounded-lg border border-white/10 bg-[#0a0b0f] px-4 py-3 text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-per-azul"
                />
              </label>

              {erro && (
                <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-300">{erro}</p>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setAberto(false)}
                  disabled={carregando}
                  className="flex-1 rounded-lg border border-white/15 py-3 font-semibold text-neutral-300 transition-colors hover:bg-white/5 disabled:opacity-60"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={carregando}
                  className="flex-1 rounded-lg bg-per-azul py-3 font-bold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
                >
                  {carregando ? "Gerando..." : "Ir para o pagamento"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
