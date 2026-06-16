"use client";

import Image from "next/image";
import Link from "next/link";
import type { Ebook } from "@/data/ebooks";
import { ebookLiberado } from "@/data/access";
import { useAcessos } from "./AcessosProvider";
import { BotaoComprar } from "./BotaoComprar";
import { EBOOK_PRECO } from "@/data/products";
import { formatBRL } from "@/data/courses";

export function EbookCard({ ebook }: { ebook: Ebook }) {
  const capa = `/ebooks/capas/${ebook.id}.png`;
  // Download protegido: o PDF é servido por /api/ebooks/[id], que confere a
  // compra NO SERVIDOR. Sem isso o arquivo ficaria público em /public.
  const arquivo = `/api/ebooks/${ebook.id}`;
  const liberado = ebookLiberado(useAcessos(), ebook.id);

  return (
    <div className="group w-[150px] shrink-0 sm:w-[165px]">
      {/* Capa real do e-book */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg ring-1 ring-white/10 transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.04] group-hover:shadow-2xl group-hover:shadow-black/60">
        <Image
          src={capa}
          alt={`Capa do e-book ${ebook.titulo}`}
          fill
          sizes="(max-width:640px) 150px, 165px"
          className={`object-cover transition-all duration-500 ${
            liberado
              ? ""
              : "opacity-50 grayscale brightness-[0.6] saturate-50 group-hover:opacity-75 group-hover:grayscale-0"
          }`}
        />

        {/* véu de "apagado" + cadeado nos e-books bloqueados */}
        {!liberado && (
          <>
            <div className="pointer-events-none absolute inset-0 bg-[#0a0b0f]/35 transition-opacity duration-300 group-hover:opacity-0" />
            <span className="absolute right-2 top-2 flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white ring-1 ring-white/20">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="4" y="11" width="16" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
              </svg>
              Bloqueado
            </span>
          </>
        )}

        {/* overlay no hover: baixar (só p/ quem já tem) */}
        {liberado && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
            <a
              href={arquivo}
              download
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-bold text-black transition-transform hover:scale-105"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v12m0 0 4-4m-4 4-4-4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" />
              </svg>
              Baixar
            </a>
          </div>
        )}
      </div>

      {/* título + ação abaixo da capa */}
      <div className="mt-2 px-0.5">
        <p className="truncate text-sm font-semibold text-neutral-100">{ebook.titulo}</p>
        {liberado ? (
          <a
            href={arquivo}
            download
            className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-neutral-400 transition-colors hover:text-white"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v12m0 0 4-4m-4 4-4-4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" />
            </svg>
            Baixar PDF
          </a>
        ) : (
          <div className="mt-1.5 space-y-1.5">
            <Link
              href="/#colecao"
              className="block text-[11px] font-bold text-per-laranja transition-colors hover:underline"
            >
              🎁 Grátis na Coleção
            </Link>
            <BotaoComprar
              itemId={ebook.id}
              label={`Comprar · ${formatBRL(EBOOK_PRECO)}`}
              className="w-full rounded-lg bg-per-azul px-2 py-1.5 text-xs font-bold text-white transition-transform hover:scale-[1.02]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
