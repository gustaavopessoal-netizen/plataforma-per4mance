"use client";

import { useState } from "react";
import type { ModuloCMS } from "@/data/cms";
import { toEmbedUrl } from "@/lib/video";

// Conteúdo do curso para o ALUNO: player + índice de módulos/aulas.
// Vídeo só toca para quem comprou (liberado); senão mostra o índice "trancado".
export function ConteudoCurso({
  modulos,
  liberado,
  cor,
}: {
  modulos: ModuloCMS[];
  liberado: boolean;
  cor: string;
}) {
  const aulas = modulos.flatMap((m) => m.aulas);
  const primeira = aulas.find((a) => a.video_url) ?? aulas[0];
  const [atualId, setAtualId] = useState<string | null>(primeira?.id ?? null);
  const atual = aulas.find((a) => a.id === atualId) ?? primeira;

  if (modulos.length === 0) {
    return (
      <div className="grid aspect-video place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-center">
        <div>
          <p className="font-display text-2xl font-bold uppercase text-white">Conteúdo em breve</p>
          <p className="mt-1 text-sm text-neutral-400">
            {liberado ? "As aulas estão sendo preparadas." : "Conteúdo em produção."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      {/* Player + material da aula */}
      <div>
        <div className="relative aspect-video overflow-hidden rounded-xl bg-black ring-1 ring-white/10">
        {liberado && atual?.video_url ? (
          <iframe
            key={atual.id}
            src={toEmbedUrl(atual.video_url)}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <div className="grid h-full place-items-center p-6 text-center">
            {liberado ? (
              <p className="text-sm text-neutral-400">
                {atual ? "Vídeo desta aula em breve." : "Selecione uma aula ao lado."}
              </p>
            ) : (
              <div>
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-black/60 text-white ring-2 ring-white/30">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="11" width="16" height="9" rx="2" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="mt-3 text-sm font-medium text-neutral-200">
                  Compre para assistir às aulas
                </p>
              </div>
            )}
          </div>
        )}
        </div>
        {liberado && atual?.material_nome && (
          <a
            href={`/api/aula-material/${atual.id}`}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-per-azul hover:underline"
          >
            📎 Baixar material: {atual.material_nome}
          </a>
        )}
      </div>

      {/* Índice de módulos e aulas */}
      <div className="flex max-h-[460px] flex-col gap-3 overflow-y-auto rounded-xl border border-white/10 bg-white/[0.02] p-3">
        {modulos.map((m) => (
          <div key={m.id}>
            <p className="px-1 pb-1 text-xs font-bold uppercase tracking-wide text-neutral-400">
              {m.titulo}
            </p>
            <div className="space-y-1">
              {m.aulas.map((a) => {
                const ativo = a.id === atual?.id;
                const podeAssistir = liberado && !!a.video_url;
                return (
                  <button
                    key={a.id}
                    onClick={() => podeAssistir && setAtualId(a.id)}
                    disabled={!podeAssistir}
                    className={`flex w-full items-center gap-2.5 rounded-lg p-2.5 text-left transition-colors ${
                      ativo ? "bg-white/10" : podeAssistir ? "hover:bg-white/5" : "opacity-60"
                    }`}
                  >
                    <span
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-md"
                      style={{ background: ativo ? cor : "#2a2e38", color: ativo ? "#000" : "#9aa0ab" }}
                    >
                      {liberado ? (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <rect x="4" y="11" width="16" height="9" rx="2" />
                          <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
                        </svg>
                      )}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-neutral-100">
                      {a.titulo}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
