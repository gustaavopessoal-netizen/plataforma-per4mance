"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

/**
 * Retorno pós-pagamento (successUrl da Asaas → /bem-vindo?compra=ok).
 * - Visitante (acabou de comprar): avisa que o e-mail de criação de senha está a
 *   caminho e oferece reenviar.
 * - Logado (comprou dentro da plataforma): acesso já liberado → entra direto.
 */
export default function BemVindoPage() {
  const [logado, setLogado] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [reenviado, setReenviado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => setLogado(!!user));
  }, []);

  async function reenviar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
        redirectTo: `${window.location.origin}/definir-senha`,
      });
      if (error) throw error;
      setReenviado(true);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível reenviar.");
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#0a0b0f] px-4 py-10">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-emerald-500/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-per-azul/15 blur-[130px]" />

      <div className="relative w-full max-w-md text-center">
        <Image src="/logo.png" alt="PER4MANCE" width={56} height={56} className="mx-auto mb-8 h-14 w-auto object-contain" />

        <div className="rounded-2xl border border-white/10 bg-[#11131a] p-8 shadow-2xl">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="font-display text-3xl font-extrabold uppercase text-white">
            Pagamento recebido!
          </h1>

          {logado ? (
            <>
              <p className="mt-2 text-neutral-300">
                Seu acesso já está liberado. Bora treinar?
              </p>
              <Link
                href="/"
                className="mt-6 block rounded-lg bg-per-azul py-3 font-bold text-white transition-transform hover:scale-[1.02]"
              >
                Entrar na plataforma →
              </Link>
            </>
          ) : (
            <>
              <p className="mt-2 text-neutral-300">
                Assim que o pagamento confirmar, enviamos um e-mail para você{" "}
                <strong className="text-white">criar sua senha</strong> e acessar tudo.
              </p>
              <p className="mt-2 text-sm text-neutral-500">
                Confira sua caixa de entrada (e o spam). Pode levar alguns minutos no Pix/boleto.
              </p>

              {reenviado ? (
                <p className="mt-6 rounded-lg bg-emerald-500/15 px-4 py-3 text-sm text-emerald-300">
                  Link reenviado! Verifique seu e-mail.
                </p>
              ) : (
                <form onSubmit={reenviar} className="mt-6 space-y-3 text-left">
                  <span className="block text-sm text-neutral-400">Não chegou? Reenviar para:</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu e-mail da compra"
                    required
                    className="w-full rounded-lg border border-white/10 bg-[#0a0b0f] px-4 py-3 text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-per-azul"
                  />
                  {erro && <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-300">{erro}</p>}
                  <button
                    type="submit"
                    className="w-full rounded-lg border border-white/15 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                  >
                    Reenviar link de senha
                  </button>
                </form>
              )}

              <Link
                href="/login"
                className="mt-6 block text-sm text-neutral-500 transition-colors hover:text-white"
              >
                Já criei minha senha → Entrar
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
