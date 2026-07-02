import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";

// Liberação progressiva das fichas: Ficha 1 na compra, +1 a cada 15 dias.
// Fichas liberadas manualmente pelo admin (tabela fichas_liberadas) entram como extra.

const DIAS_POR_FICHA = 15;
const TOTAL_FICHAS = 6;
const DIA_MS = 86_400_000;

export type Drip = {
  desbloqueadas: number[]; // números das fichas liberadas (1..6)
  dataCompra: string | null; // ISO — base do cálculo (null p/ admin ou sem compra)
  admin: boolean;
};

const VAZIO: Drip = { desbloqueadas: [], dataCompra: null, admin: false };

/**
 * Fichas liberadas para o usuário logado neste curso. Server-only, sob RLS.
 * Nunca lança: qualquer erro → nada liberado (fecha, nunca abre por engano).
 */
export const getDrip = cache(async (cursoId: string): Promise<Drip> => {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key || key.startsWith("COLE_")) return VAZIO;

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return VAZIO;

    // Dono/admin vê todas as fichas (não espera o drip).
    if (isAdmin(user.email)) {
      return { desbloqueadas: [1, 2, 3, 4, 5, 6], dataCompra: null, admin: true };
    }

    // Data da compra que cobre este curso (avulso do próprio curso OU a Coleção).
    const { data: compras } = await supabase
      .from("compras")
      .select("tipo, item_id, status, created_at")
      .eq("status", "confirmado");

    let dataCompra: string | null = null;
    for (const c of (compras ?? []) as { tipo: string; item_id: string | null; created_at: string }[]) {
      const cobre = (c.tipo === "curso" && c.item_id === cursoId) || c.tipo === "colecao";
      if (cobre && c.created_at && (!dataCompra || c.created_at < dataCompra)) {
        dataCompra = c.created_at;
      }
    }

    const set = new Set<number>();
    if (dataCompra) {
      const dias = Math.floor((Date.now() - new Date(dataCompra).getTime()) / DIA_MS);
      const n = Math.min(TOTAL_FICHAS, Math.max(1, Math.floor(dias / DIAS_POR_FICHA) + 1));
      for (let i = 1; i <= n; i++) set.add(i);
    }

    // Liberações manuais (fail-safe: se a tabela ainda não existe, ignora).
    try {
      const { data: manuais } = await supabase
        .from("fichas_liberadas")
        .select("ficha_num")
        .eq("curso_id", cursoId);
      for (const r of (manuais ?? []) as { ficha_num: number }[]) set.add(r.ficha_num);
    } catch {
      /* tabela ausente → só o drip por data */
    }

    return { desbloqueadas: [...set].sort((a, b) => a - b), dataCompra, admin: false };
  } catch {
    return VAZIO;
  }
});
