"use client";

import { useState } from "react";

export function EbooksDoCurso({
  cursoId,
  todos,
  selecionadosIniciais,
}: {
  cursoId: string;
  todos: { id: string; titulo: string }[];
  selecionadosIniciais: string[];
}) {
  const [sel, setSel] = useState<Set<string>>(new Set(selecionadosIniciais));
  const [salvando, setSalvando] = useState(false);
  const [msg, setMsg] = useState("");

  function toggle(id: string) {
    const n = new Set(sel);
    if (n.has(id)) n.delete(id);
    else n.add(id);
    setSel(n);
  }

  async function salvar() {
    setSalvando(true);
    setMsg("");
    try {
      const r = await fetch("/api/admin/curso-ebooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cursoId, ebookIds: [...sel] }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error ?? "Erro ao salvar.");
      setMsg("E-books salvos!");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Erro.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="mb-1 font-semibold text-white">E-books deste curso</p>
      <p className="mb-3 text-sm text-neutral-400">
        Marque os e-books que o aluno recebe ao comprar este protocolo.
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {todos.map((e) => (
          <label
            key={e.id}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-[#0a0b0f] p-2.5 text-sm text-neutral-200 hover:bg-white/5"
          >
            <input
              type="checkbox"
              checked={sel.has(e.id)}
              onChange={() => toggle(e.id)}
              className="accent-per-azul"
            />
            <span className="truncate">{e.titulo}</span>
          </label>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={salvar}
          disabled={salvando}
          className="rounded-lg bg-per-azul px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.03] disabled:opacity-60"
        >
          {salvando ? "Salvando..." : "Salvar e-books"}
        </button>
        {msg && <span className="text-xs text-emerald-400">{msg}</span>}
      </div>
    </div>
  );
}
