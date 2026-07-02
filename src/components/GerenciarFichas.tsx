"use client";

import { useState } from "react";
import { protocolos } from "@/data/courses";

// Painel admin: libera/trava fichas MANUALMENTE para um aluno (fora do ritmo de
// 15 dias). Verde = liberada na mão. As liberadas pelo tempo não aparecem aqui.
export function GerenciarFichas({
  userId,
  inicial,
}: {
  userId: string;
  inicial: Record<string, number[]>;
}) {
  const [estado, setEstado] = useState<Record<string, number[]>>(inicial);
  const [salvando, setSalvando] = useState<string | null>(null);

  async function toggle(cursoId: string, num: number) {
    const key = `${cursoId}-${num}`;
    const liberar = !(estado[cursoId] ?? []).includes(num);
    setSalvando(key);
    try {
      const res = await fetch("/api/admin/ficha-liberada", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, cursoId, fichaNum: num, liberar }),
      });
      if (!res.ok) throw new Error();
      setEstado((s) => {
        const arr = new Set(s[cursoId] ?? []);
        if (liberar) arr.add(num);
        else arr.delete(num);
        return { ...s, [cursoId]: [...arr] };
      });
    } catch {
      alert("Erro ao salvar. Confira se a tabela 'fichas_liberadas' já foi criada no Supabase.");
    } finally {
      setSalvando(null);
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-neutral-500">
        Libere fichas na mão (fora do ritmo de 15 dias). <span className="font-semibold">Verde</span> = liberada manualmente.
      </p>
      {protocolos.map((c) => (
        <div key={c.id} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] p-2.5">
          <span className="w-28 shrink-0 truncate text-sm text-neutral-200">{c.regiao}</span>
          <div className="flex flex-wrap gap-1.5">
            {[1, 2, 3, 4, 5, 6].map((n) => {
              const on = (estado[c.id] ?? []).includes(n);
              const key = `${c.id}-${n}`;
              return (
                <button
                  key={n}
                  onClick={() => toggle(c.id, n)}
                  disabled={salvando === key}
                  className={`h-7 w-7 rounded-md text-xs font-bold transition-colors disabled:opacity-40 ${
                    on ? "text-black" : "bg-white/5 text-neutral-400 hover:bg-white/10"
                  }`}
                  style={on ? { background: c.cor } : undefined}
                  title={`Ficha ${n}`}
                >
                  {n}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
