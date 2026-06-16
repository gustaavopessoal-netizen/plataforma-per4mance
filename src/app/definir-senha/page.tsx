"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

/**
 * Página onde o comprador CRIA a própria senha, vindo do link enviado por e-mail
 * após a compra (fluxo de recovery do Supabase). O @supabase/ssr troca o `code`
 * da URL por sessão automaticamente (detectSessionInUrl). Aqui só esperamos a
 * sessão de recuperação ficar pronta e então salvamos a nova senha.
 */
export default function DefinirSenhaPage() {
  const router = useRouter();
  const [pronto, setPronto] = useState(false);
  const [semSessao, setSemSessao] = useState(false);
  const [senha, setSenha] = useState("");
  const [confirma, setConfirma] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let achou = false;

    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN" || event === "INITIAL_SESSION")) {
        achou = true;
        setPronto(true);
      }
    });

    // fallback: confere a sessão direto (caso o evento já tenha passado)
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        achou = true;
        setPronto(true);
      }
    });

    // se em 4s não houver sessão, o link provavelmente expirou/é inválido
    const t = setTimeout(() => {
      if (!achou) setSemSessao(true);
    }, 4000);

    return () => {
      sub.subscription.unsubscribe();
      clearTimeout(t);
    };
  }, []);

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    if (senha.length < 6) return setErro("A senha precisa ter pelo menos 6 caracteres.");
    if (senha !== confirma) return setErro("As senhas não conferem.");
    setCarregando(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.updateUser({ password: senha });
      if (error) throw error;
      await supabase.auth.updateUser({ data: { precisa_senha: false } });
      setOk(true);
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1200);
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Não foi possível salvar a senha.");
      setCarregando(false);
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#0a0b0f] px-4 py-10">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-per-azul/20 blur-[130px]" />

      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center">
          <Image src="/logo.png" alt="PER4MANCE" width={56} height={56} className="h-14 w-auto object-contain" />
        </Link>

        <div className="rounded-2xl border border-white/10 bg-[#11131a] p-8 shadow-2xl">
          {ok ? (
            <div className="text-center">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h1 className="font-display text-2xl font-extrabold uppercase text-white">Senha criada!</h1>
              <p className="mt-1 text-sm text-neutral-400">Entrando na plataforma...</p>
            </div>
          ) : (
            <>
              <h1 className="font-display text-3xl font-extrabold uppercase text-white">Crie sua senha</h1>
              <p className="mt-1 text-sm text-neutral-400">
                Defina a senha de acesso ao Universo PER4MANCE.
              </p>

              {semSessao && !pronto ? (
                <div className="mt-6 rounded-lg bg-amber-500/15 px-4 py-3 text-sm text-amber-200">
                  Este link expirou ou já foi usado. Volte ao{" "}
                  <Link href="/bem-vindo" className="font-semibold underline">
                    e-mail de boas-vindas
                  </Link>{" "}
                  para receber um novo, ou use “Esqueci a senha” na tela de{" "}
                  <Link href="/login" className="font-semibold underline">
                    login
                  </Link>
                  .
                </div>
              ) : !pronto ? (
                <p className="mt-6 text-sm text-neutral-400">Validando seu link...</p>
              ) : (
                <form onSubmit={salvar} className="mt-6 space-y-4">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-neutral-300">Nova senha</span>
                    <input
                      type="password"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full rounded-lg border border-white/10 bg-[#0a0b0f] px-4 py-3 text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-per-azul"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-neutral-300">Confirmar senha</span>
                    <input
                      type="password"
                      value={confirma}
                      onChange={(e) => setConfirma(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full rounded-lg border border-white/10 bg-[#0a0b0f] px-4 py-3 text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-per-azul"
                    />
                  </label>

                  {erro && <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-300">{erro}</p>}

                  <button
                    type="submit"
                    disabled={carregando}
                    className="w-full rounded-lg bg-per-azul py-3 font-bold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
                  >
                    {carregando ? "Salvando..." : "Criar senha e entrar"}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
