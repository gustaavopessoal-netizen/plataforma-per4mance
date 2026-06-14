"use client";

import Link from "next/link";
import Image from "next/image";
import type { Curso } from "@/data/courses";
import { cursoLiberado } from "@/data/access";
import { useAcessos } from "./AcessosProvider";

export function CourseCard({ curso, progresso }: { curso: Curso; progresso?: number }) {
  const liberado = cursoLiberado(useAcessos(), curso.id);

  return (
    <Link
      href={`/curso/${curso.id}`}
      className="group relative block w-[148px] shrink-0 sm:w-[165px] md:w-[182px]"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-neutral-900 shadow-md ring-1 ring-white/10 transition-all duration-300 ease-out group-hover:z-10 group-hover:-translate-y-1 group-hover:scale-[1.05] group-hover:shadow-2xl group-hover:shadow-black/60">
        <Image
          src={curso.capa}
          alt={`${curso.regiao} ${curso.tagline}`}
          fill
          sizes="(max-width:768px) 165px, 182px"
          className={`object-cover transition-all duration-500 ease-out group-hover:scale-110 ${
            liberado
              ? ""
              : "opacity-50 grayscale brightness-[0.6] saturate-50 group-hover:opacity-75 group-hover:grayscale-0 group-hover:brightness-90"
          }`}
        />

        {/* véu de "apagado" para cursos bloqueados (transparência por cima) */}
        {!liberado && (
          <div className="pointer-events-none absolute inset-0 bg-[#0a0b0f]/35 transition-opacity duration-300 group-hover:opacity-0" />
        )}

        {/* escurecimento de base para leitura do texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

        {/* anel de acento: SEMPRE visível no comprado (destaca), só no hover no bloqueado */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300 ${
            liberado ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          style={{ boxShadow: `inset 0 0 0 2px ${curso.cor}` }}
        />

        {/* número gigante */}
        <span className="absolute left-2 top-1 font-display text-4xl font-extrabold leading-none text-white/85 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
          {curso.num}
        </span>

        {/* etiquetas topo */}
        <div className="absolute right-2 top-2 flex flex-col items-end gap-1">
          {liberado ? (
            <span
              className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black"
              style={{ background: curso.cor }}
            >
              Liberado
            </span>
          ) : (
            <span className="flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white ring-1 ring-white/20">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="4" y="11" width="16" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
              </svg>
              Bloqueado
            </span>
          )}
          {curso.maisVendido && (
            <span className="rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white ring-1 ring-white/20">
              Mais vendido
            </span>
          )}
        </div>

        {/* ícone central: play (liberado) ou cadeado (bloqueado) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/95 text-black shadow-lg">
            {liberado ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="11" width="16" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
              </svg>
            )}
          </span>
        </div>

        {/* texto inferior */}
        <div
          className={`absolute inset-x-0 bottom-0 p-3 transition-opacity duration-300 ${
            liberado ? "" : "opacity-70 group-hover:opacity-100"
          }`}
        >
          <p className="font-display text-xl font-bold uppercase leading-none tracking-wide text-white">
            {curso.regiao}
          </p>
          <p
            className="mt-0.5 text-[11px] font-bold uppercase tracking-wider"
            style={{ color: curso.cor }}
          >
            {curso.tagline}
          </p>

          {liberado && typeof progresso === "number" && (
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full"
                style={{ width: `${progresso}%`, background: curso.cor }}
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
