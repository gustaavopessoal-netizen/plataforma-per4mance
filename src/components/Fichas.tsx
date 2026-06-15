"use client";

import { useState } from "react";
import type { Modulo } from "@/data/courses";

// Lista as 6 fichas (90 dias / 3 fases). Os exercícios só aparecem para quem
// comprou (liberado) — protege o conteúdo pago; o resto vê só o título/fase.
export function Fichas({
  modulos,
  liberado,
  cor,
}: {
  modulos: Modulo[];
  liberado: boolean;
  cor: string;
}) {
  const [aberta, setAberta] = useState<number | null>(liberado ? modulos[0]?.num ?? null : null);

  return (
    <ul className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
      {modulos.map((m) => {
        const aberto = liberado && aberta === m.num;
        return (
          <li key={m.num}>
            <button
              onClick={() => liberado && setAberta(aberto ? null : m.num)}
              className={`flex w-full items-center gap-4 p-4 text-left transition-colors ${
                liberado ? "hover:bg-white/5" : "cursor-default"
              }`}
            >
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-lg font-display text-lg font-bold text-black"
                style={{ background: cor }}
              >
                {m.num}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-neutral-100">
                  Ficha {m.num} — {m.titulo}
                </p>
                <p className="mt-0.5 text-xs font-medium text-neutral-400">
                  <span style={{ color: cor }}>{m.fase}</span> · Dias {m.dias} ·{" "}
                  {m.exercicios.length} exercícios
                </p>
              </div>
              {liberado ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`shrink-0 text-neutral-400 transition-transform ${aberto ? "rotate-180" : ""}`}
                >
                  <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 text-neutral-500">
                  <rect x="4" y="11" width="16" height="9" rx="2" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
                </svg>
              )}
            </button>

            {aberto && (
              <div className="border-t border-white/5 bg-black/20 px-4 py-3">
                <ul className="space-y-1.5">
                  {m.exercicios.map((e, i) => (
                    <li key={i} className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="text-neutral-200">
                        <span className="mr-2 text-xs font-bold text-neutral-500">{i + 1}.</span>
                        {e.nome}
                      </span>
                      <span className="shrink-0 text-xs font-semibold text-neutral-400">
                        {e.prescricao}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
