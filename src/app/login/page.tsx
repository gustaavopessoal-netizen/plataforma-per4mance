"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

function traduzErro(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("invalid login credentials")) return "E-mail ou senha incorretos.";
  if (m.includes("email not confirmed"))
    return "Confirme seu e-mail antes de entrar (veja sua caixa de entrada).";
  if (m.includes("already registered")) return "Esse e-mail já tem conta. Faça login.";
  if (m.includes("password should be at least"))
    return "A senha precisa ter pelo menos 6 caracteres.";
  if (m.includes("unable to validate email") || m.includes("invalid email"))
    return "E-mail inválido.";
  return msg;
}

export default function LoginPage() {
  const router = useRouter();
  const [modo, setModo] = useState<"entrar" | "criar">("entrar");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setAviso(null);
    setCarregando(true);
    const supabase = createClient();
    try {
      if (modo === "entrar") {
        const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
        if (error) throw error;
        router.push("/");
        router.refresh();
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: senha,
          options: { data: { nome } },
        });
        if (error) throw error;
        if (data.session) {
          router.push("/");
          router.refresh();
        } else {
          setAviso("Conta criada! Confira seu e-mail para confirmar e depois entre.");
          setModo("entrar");
        }
      }
    } catch (err) {
      setErro(traduzErro(err instanceof Error ? err.message : String(err)));
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#0a0b0f] px-4 py-10">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-per-azul/20 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-per-laranja/10 blur-[130px]" />

      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-6 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="PER4MANCE"
            width={270}
            height={480}
            className="h-48 w-auto object-contain"
          />
        </Link>

        <div className="rounded-2xl border border-white/10 bg-[#11131a] p-8 shadow-2xl">
          <h1 className="font-display text-3xl font-extrabold uppercase text-white">
            {modo === "entrar" ? "Entrar" : "Criar conta"}
          </h1>
          <p className="mt-1 text-sm text-neutral-400">
            {modo === "entrar"
              ? "Acesse o Universo PER4MANCE."
              : "Crie sua conta e comece sua evolução."}
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {modo === "criar" && (
              <Campo label="Nome" type="text" value={nome} onChange={setNome} placeholder="Seu nome" />
            )}
            <Campo
              label="E-mail"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="voce@email.com"
              required
            />
            <Campo
              label="Senha"
              type="password"
              value={senha}
              onChange={setSenha}
              placeholder="••••••••"
              required
            />

            {erro && (
              <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-300">{erro}</p>
            )}
            {aviso && (
              <p className="rounded-lg bg-emerald-500/15 px-3 py-2 text-sm text-emerald-300">
                {aviso}
              </p>
            )}

            <button
              type="submit"
              disabled={carregando}
              className="w-full rounded-lg bg-per-azul py-3 font-bold text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {carregando ? "Aguarde..." : modo === "entrar" ? "Entrar" : "Criar conta"}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-neutral-400">
            {modo === "entrar" ? "Ainda não tem conta? " : "Já tem conta? "}
            <button
              type="button"
              onClick={() => {
                setModo(modo === "entrar" ? "criar" : "entrar");
                setErro(null);
                setAviso(null);
              }}
              className="font-semibold text-per-azul hover:underline"
            >
              {modo === "entrar" ? "Criar agora" : "Entrar"}
            </button>
          </p>
        </div>

        <Link
          href="/"
          className="mt-6 block text-center text-sm text-neutral-500 transition-colors hover:text-white"
        >
          ← Voltar para a plataforma
        </Link>
      </div>
    </main>
  );
}

function Campo({
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  const [mostrar, setMostrar] = useState(false);
  const isSenha = type === "password";
  const tipoReal = isSenha && mostrar ? "text" : type;

  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-neutral-300">{label}</span>
      <div className="relative">
        <input
          type={tipoReal}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={`w-full rounded-lg border border-white/10 bg-[#0a0b0f] px-4 py-3 text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-per-azul ${
            isSenha ? "pr-11" : ""
          }`}
        />
        {isSenha && (
          <button
            type="button"
            onClick={() => setMostrar((m) => !m)}
            aria-label={mostrar ? "Ocultar senha" : "Mostrar senha"}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-white"
          >
            {mostrar ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c6.5 0 10 7 10 7a13.2 13.2 0 0 1-1.67 2.68M6.06 6.06A13.2 13.2 0 0 0 2 12s3.5 7 10 7a9.12 9.12 0 0 0 4.94-1.44" strokeLinecap="round" />
                <path d="m2 2 20 20" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
    </label>
  );
}
