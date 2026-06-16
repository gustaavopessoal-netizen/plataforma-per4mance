"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { isAdmin } from "@/lib/admin";

const LINKS = [
  { label: "Início", href: "/" },
  { label: "Profissionais", href: "/#profissionais" },
  { label: "Atletas", href: "/#atletas" },
  { label: "Protocolos", href: "/#catalogo" },
  { label: "E-books", href: "/#ebooks" },
];

export function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [mentor, setMentor] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setMentor(false);
      return;
    }
    const supabase = createClient();
    supabase
      .from("mentoria_membros")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => setMentor(!!data));
  }, [user]);

  async function sair() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0b0f]/95 shadow-lg shadow-black/40 backdrop-blur"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1500px] items-center gap-6 px-4 md:px-12">
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="PER4MANCE" className="h-8 w-auto object-contain" />
        </Link>

        <ul className="ml-2 hidden items-center gap-5 text-sm font-medium text-neutral-300 md:flex">
          {LINKS.map((l, i) => (
            <li key={i}>
              <Link href={l.href} className="transition-colors hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
          {mentor && (
            <li>
              <Link href="/mentoria" className="font-bold text-per-laranja transition-colors hover:text-per-laranja/80">
                Mentoria
              </Link>
            </li>
          )}
        </ul>

        <div className="ml-auto flex items-center gap-4">
          <button
            aria-label="Buscar"
            className="grid h-9 w-9 place-items-center rounded-full text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" strokeLinecap="round" />
            </svg>
          </button>
          {isAdmin(user?.email) && (
            <Link
              href="/admin"
              className="hidden rounded-lg border border-per-laranja/50 bg-per-laranja/15 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-per-laranja transition-colors hover:bg-per-laranja/25 sm:block"
            >
              Painel
            </Link>
          )}
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/conta"
                title="Minha conta"
                className="grid h-9 w-9 place-items-center rounded-full bg-per-azul text-sm font-bold uppercase text-white ring-1 ring-white/20 transition-transform hover:scale-105"
              >
                {(user.email ?? "?").charAt(0)}
              </Link>
              <button
                onClick={sair}
                className="hidden text-sm font-medium text-neutral-300 transition-colors hover:text-white sm:block"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-black transition-transform hover:scale-105"
            >
              Entrar
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
