"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import type { AnexoAluno } from "@/data/admin-data";

export function AnexosAluno({ userId, inicial }: { userId: string; inicial: AnexoAluno[] }) {
  const [anexos, setAnexos] = useState<AnexoAluno[]>(inicial);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function enviarArquivo(file: File) {
    setErro("");
    setEnviando(true);
    try {
      // 1) URL assinada de upload
      const r1 = await fetch("/api/admin/anexo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "upload-url", userId, nome: file.name }),
      });
      const d1 = await r1.json();
      if (!r1.ok) throw new Error(d1.error ?? "Erro ao preparar upload.");

      // 2) Sobe direto pro Storage (sem passar o arquivo pelo servidor)
      const supabase = createClient();
      const { error } = await supabase.storage
        .from("anexos")
        .uploadToSignedUrl(d1.path, d1.token, file);
      if (error) throw new Error(error.message);

      // 3) Registra o anexo
      const r2 = await fetch("/api/admin/anexo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "registrar", userId, nome: file.name, path: d1.path }),
      });
      const d2 = await r2.json();
      if (!r2.ok) throw new Error(d2.error ?? "Erro ao registrar.");
      setAnexos(d2.anexos);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao enviar.");
    } finally {
      setEnviando(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function excluir(id: string) {
    if (!confirm("Excluir este anexo?")) return;
    const r = await fetch("/api/admin/anexo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "excluir", id }),
    });
    const d = await r.json();
    if (r.ok) setAnexos(d.anexos);
    else setErro(d.error ?? "Erro ao excluir.");
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="font-semibold text-white">Anexos / adendos</p>
        <label
          className={`cursor-pointer rounded-lg bg-per-azul px-4 py-2 text-sm font-bold text-white transition-transform hover:scale-[1.03] ${
            enviando ? "pointer-events-none opacity-60" : ""
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            disabled={enviando}
            onChange={(e) => e.target.files?.[0] && enviarArquivo(e.target.files[0])}
          />
          {enviando ? "Enviando..." : "+ Anexar arquivo"}
        </label>
      </div>

      {erro && <p className="mb-2 text-xs text-red-400">{erro}</p>}

      {anexos.length === 0 ? (
        <p className="text-sm text-neutral-500">Nenhum anexo para este aluno.</p>
      ) : (
        <ul className="divide-y divide-white/10 overflow-hidden rounded-lg border border-white/10">
          {anexos.map((a) => (
            <li key={a.id} className="flex items-center justify-between gap-3 p-3 text-sm">
              <a
                href={`/api/anexo/${a.id}`}
                target="_blank"
                rel="noreferrer"
                className="flex min-w-0 items-center gap-2 text-neutral-200 hover:text-white"
              >
                <span>📎</span>
                <span className="truncate">{a.nome}</span>
              </a>
              <button
                onClick={() => excluir(a.id)}
                className="shrink-0 text-neutral-500 transition-colors hover:text-red-400"
                title="Excluir"
              >
                🗑
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
