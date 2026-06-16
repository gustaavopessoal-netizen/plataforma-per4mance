"use client";

import { useState, useRef } from "react";
import type { ModuloCMS, AulaCMS } from "@/data/cms";
import { createClient } from "@/lib/supabase/client";

// Anexo (material) de UMA aula: upload direto pro Storage (signed URL) + remover.
function MaterialAula({
  aula,
  cursoId,
  onUpdate,
}: {
  aula: AulaCMS;
  cursoId: string;
  onUpdate: (m: ModuloCMS[]) => void;
}) {
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  async function enviar(file: File) {
    setBusy(true);
    try {
      const r1 = await fetch("/api/admin/aula-material", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "upload-url", aulaId: aula.id, nome: file.name }),
      });
      const d1 = await r1.json();
      if (!r1.ok) throw new Error(d1.error ?? "Erro.");
      const supabase = createClient();
      const { error } = await supabase.storage.from("anexos").uploadToSignedUrl(d1.path, d1.token, file);
      if (error) throw new Error(error.message);
      const r2 = await fetch("/api/admin/aula-material", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "salvar", aulaId: aula.id, cursoId, path: d1.path, nome: file.name }),
      });
      const d2 = await r2.json();
      if (!r2.ok) throw new Error(d2.error ?? "Erro.");
      onUpdate(d2.modulos);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Erro ao enviar material.");
    } finally {
      setBusy(false);
      if (ref.current) ref.current.value = "";
    }
  }

  async function remover() {
    setBusy(true);
    try {
      const r = await fetch("/api/admin/aula-material", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "remover", aulaId: aula.id, cursoId }),
      });
      const d = await r.json();
      if (r.ok) onUpdate(d.modulos);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-2 flex items-center gap-2 text-xs">
      {aula.material_nome ? (
        <>
          <span className="truncate text-neutral-300">📎 {aula.material_nome}</span>
          <button onClick={remover} disabled={busy} className="text-red-400 hover:underline disabled:opacity-50">
            {busy ? "..." : "remover"}
          </button>
        </>
      ) : (
        <label className="cursor-pointer text-neutral-400 transition-colors hover:text-white">
          <input
            ref={ref}
            type="file"
            className="hidden"
            disabled={busy}
            onChange={(e) => e.target.files?.[0] && enviar(e.target.files[0])}
          />
          {busy ? "enviando..." : "📎 anexar material"}
        </label>
      )}
    </div>
  );
}

const btnIcon =
  "grid h-8 w-8 place-items-center rounded-md text-neutral-400 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent";

export function AdminCMS({
  cursoId,
  inicial,
  cor,
}: {
  cursoId: string;
  inicial: ModuloCMS[];
  cor: string;
}) {
  const [modulos, setModulos] = useState<ModuloCMS[]>(inicial);
  const [busy, setBusy] = useState(false);

  async function acao(payload: Record<string, unknown>) {
    setBusy(true);
    try {
      const res = await fetch("/api/admin/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, cursoId }),
      });
      const data = await res.json();
      if (res.ok && data.modulos) setModulos(data.modulos);
      else alert(data.error ?? "Erro ao salvar.");
    } catch {
      alert("Falha de conexão.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-neutral-400">
          {modulos.length} módulo(s) ·{" "}
          {modulos.reduce((n, m) => n + m.aulas.length, 0)} aula(s)
        </p>
        <button
          onClick={() => acao({ action: "modulo.criar", titulo: "Novo módulo" })}
          disabled={busy}
          className="rounded-lg px-4 py-2 text-sm font-bold text-black transition-transform hover:scale-[1.03] disabled:opacity-60"
          style={{ background: cor }}
        >
          + Criar módulo
        </button>
      </div>

      {modulos.length === 0 && (
        <div className="rounded-xl border border-dashed border-white/15 p-10 text-center">
          <p className="font-semibold text-neutral-200">Nenhum módulo ainda</p>
          <p className="mt-1 text-sm text-neutral-500">
            Clique em “Criar módulo” para começar a montar o curso.
          </p>
        </div>
      )}

      {modulos.map((m, mi) => (
        <div key={m.id} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
          {/* Cabeçalho do módulo */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] p-3">
            <span className="shrink-0 rounded bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-neutral-300">
              Módulo {mi + 1}
            </span>
            <input
              defaultValue={m.titulo}
              key={`mt-${m.id}-${m.titulo}`}
              onBlur={(e) =>
                e.target.value.trim() !== m.titulo &&
                acao({ action: "modulo.renomear", id: m.id, titulo: e.target.value })
              }
              className="flex-1 rounded bg-transparent px-1 py-1 font-semibold text-white outline-none focus:bg-white/5"
            />
            <button className={btnIcon} title="Subir" disabled={busy || mi === 0} onClick={() => acao({ action: "modulo.mover", id: m.id, dir: "up" })}>↑</button>
            <button className={btnIcon} title="Descer" disabled={busy || mi === modulos.length - 1} onClick={() => acao({ action: "modulo.mover", id: m.id, dir: "down" })}>↓</button>
            <button
              className={`${btnIcon} hover:text-red-400`}
              title="Excluir módulo"
              disabled={busy}
              onClick={() => confirm(`Excluir o módulo "${m.titulo}" e suas aulas?`) && acao({ action: "modulo.excluir", id: m.id })}
            >
              🗑
            </button>
          </div>

          {/* Aulas */}
          <div className="space-y-2 p-3">
            {m.aulas.map((a, ai) => (
              <div key={a.id} className="rounded-lg border border-white/10 bg-[#0a0b0f] p-3">
                <div className="flex items-center gap-2">
                  <span className="shrink-0 text-xs font-bold text-neutral-500">Aula {ai + 1}</span>
                  <input
                    defaultValue={a.titulo}
                    key={`at-${a.id}-${a.titulo}`}
                    onBlur={(e) =>
                      e.target.value.trim() !== a.titulo &&
                      acao({ action: "aula.atualizar", id: a.id, titulo: e.target.value })
                    }
                    className="flex-1 rounded bg-transparent px-1 py-1 font-semibold text-white outline-none focus:bg-white/5"
                  />
                  <label className="flex shrink-0 cursor-pointer items-center gap-1.5 text-xs text-neutral-400">
                    <input
                      type="checkbox"
                      defaultChecked={a.publicado}
                      onChange={(e) => acao({ action: "aula.atualizar", id: a.id, publicado: e.target.checked })}
                      className="accent-emerald-500"
                    />
                    {a.publicado ? <span className="text-emerald-400">Publicado</span> : "Rascunho"}
                  </label>
                  <button className={btnIcon} title="Subir" disabled={busy || ai === 0} onClick={() => acao({ action: "aula.mover", id: a.id, moduloId: m.id, dir: "up" })}>↑</button>
                  <button className={btnIcon} title="Descer" disabled={busy || ai === m.aulas.length - 1} onClick={() => acao({ action: "aula.mover", id: a.id, moduloId: m.id, dir: "down" })}>↓</button>
                  <button
                    className={`${btnIcon} hover:text-red-400`}
                    title="Excluir aula"
                    disabled={busy}
                    onClick={() => confirm(`Excluir a aula "${a.titulo}"?`) && acao({ action: "aula.excluir", id: a.id })}
                  >
                    🗑
                  </button>
                </div>
                <input
                  defaultValue={a.video_url ?? ""}
                  key={`av-${a.id}`}
                  onBlur={(e) =>
                    (e.target.value.trim() || null) !== a.video_url &&
                    acao({ action: "aula.atualizar", id: a.id, video_url: e.target.value })
                  }
                  placeholder="🎬 Cole o link do vídeo (YouTube, Bunny, Panda...)"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-per-azul"
                />
                <MaterialAula aula={a} cursoId={cursoId} onUpdate={setModulos} />
              </div>
            ))}

            <button
              onClick={() => acao({ action: "aula.criar", moduloId: m.id, titulo: "Nova aula" })}
              disabled={busy}
              className="w-full rounded-lg border border-dashed border-white/15 py-2.5 text-sm font-semibold text-neutral-300 transition-colors hover:bg-white/5 disabled:opacity-60"
            >
              + Adicionar aula
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
