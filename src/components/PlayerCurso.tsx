"use client";

import { useState } from "react";
import type { Modulo } from "@/data/courses";

export function PlayerCurso({
  modulos,
  videos,
  cor,
}: {
  modulos: Modulo[];
  videos: Record<number, string>;
  cor: string;
}) {
  const comVideo = modulos.filter((m) => videos[m.num]);
  const [atual, setAtual] = useState<number>(comVideo[0]?.num ?? modulos[0]?.num ?? 1);

  // Nenhum vídeo cadastrado ainda
  if (comVideo.length === 0) {
    return (
      <div className="grid aspect-video place-items-center rounded-xl border border-white/10 bg-white/[0.02] text-center">
        <div>
          <p className="font-display text-2xl font-bold uppercase text-white">Aulas em breve</p>
          <p className="mt-1 text-sm text-neutral-400">
            Seu acesso está liberado — os vídeos estão sendo preparados.
          </p>
        </div>
      </div>
    );
  }

  const src = videos[atual];

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
      {/* Player */}
      <div className="relative aspect-video overflow-hidden rounded-xl bg-black ring-1 ring-white/10">
        <iframe
          key={atual}
          src={src}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>

      {/* Lista de módulos (episódios) */}
      <div className="flex max-h-[420px] flex-col gap-1.5 overflow-y-auto rounded-xl border border-white/10 bg-white/[0.02] p-2">
        {modulos.map((m) => {
          const tem = !!videos[m.num];
          const ativo = m.num === atual;
          return (
            <button
              key={m.num}
              onClick={() => tem && setAtual(m.num)}
              disabled={!tem}
              className={`flex items-center gap-3 rounded-lg p-2.5 text-left transition-colors ${
                ativo ? "bg-white/10" : "hover:bg-white/5"
              } ${tem ? "" : "opacity-40"}`}
            >
              <span
                className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-sm font-bold text-black"
                style={{ background: ativo ? cor : "#2a2e38", color: ativo ? "#000" : "#9aa0ab" }}
              >
                {m.num}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-neutral-100">
                  {m.titulo}
                </span>
                <span className="block text-xs text-neutral-500">
                  {tem ? m.duracao : "em breve"}
                </span>
              </span>
              {ativo && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill={cor}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
