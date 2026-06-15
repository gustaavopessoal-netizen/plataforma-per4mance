"use client";

import { useState } from "react";
import type { Modulo } from "@/data/courses";

type LinhaProps = {
  cursoId: string;
  modulo: Modulo;
  inicial: string;
  cor: string;
};

function LinhaModulo({ cursoId, modulo, inicial, cor }: LinhaProps) {
  const [valor, setValor] = useState(inicial);
  const [salvando, setSalvando] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "erro">("idle");
  const [msg, setMsg] = useState("");

  async function salvar() {
    setSalvando(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/admin/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cursoId, moduloNum: modulo.num, videoUrl: valor }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Erro ao salvar.");
      setStatus("ok");
      setMsg(valor.trim() ? "Vídeo salvo!" : "Vídeo removido.");
    } catch (e) {
      setStatus("erro");
      setMsg(e instanceof Error ? e.message : "Erro ao salvar.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <div className="mb-2 flex items-center gap-3">
        <span
          className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-sm font-bold text-black"
          style={{ background: cor }}
        >
          {modulo.num}
        </span>
        <p className="font-semibold text-neutral-100">{modulo.titulo}</p>
        {inicial && status === "idle" && (
          <span className="ml-auto text-xs font-semibold text-emerald-400">● com vídeo</span>
        )}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="Cole aqui o link/embed do Panda Video deste módulo"
          className="flex-1 rounded-lg border border-white/10 bg-[#0a0b0f] px-4 py-2.5 text-sm text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-per-azul"
        />
        <button
          onClick={salvar}
          disabled={salvando}
          className="rounded-lg bg-per-azul px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.03] disabled:opacity-60"
        >
          {salvando ? "Salvando..." : "Salvar"}
        </button>
      </div>
      {status !== "idle" && (
        <p className={`mt-2 text-xs ${status === "ok" ? "text-emerald-400" : "text-red-400"}`}>
          {msg}
        </p>
      )}
    </div>
  );
}

export function EditorVideos({
  cursoId,
  modulos,
  videosIniciais,
  cor,
}: {
  cursoId: string;
  modulos: Modulo[];
  videosIniciais: Record<number, string>;
  cor: string;
}) {
  return (
    <div className="space-y-3">
      {modulos.map((m) => (
        <LinhaModulo
          key={m.num}
          cursoId={cursoId}
          modulo={m}
          inicial={videosIniciais[m.num] ?? ""}
          cor={cor}
        />
      ))}
    </div>
  );
}
