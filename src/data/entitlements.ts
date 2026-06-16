import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { isAdmin } from "@/lib/admin";
import { ACESSOS_VISITANTE, type Acessos } from "./access";

// Dono/admin enxerga tudo pelo mecanismo legítimo (isAdmin), sem backdoor por compra.
const ACESSO_TOTAL: Acessos = { cursos: [], ebooks: [], colecao: true };

type CompraRow = {
  tipo: "curso" | "ebook" | "colecao";
  item_id: string | null;
  status: string;
};

function fold(rows: CompraRow[]): Acessos {
  const cursos = new Set<string>();
  const ebooks = new Set<string>();
  let colecao = false;
  for (const r of rows) {
    if (r.status !== "confirmado") continue;
    if (r.tipo === "colecao") colecao = true;
    else if (r.tipo === "curso" && r.item_id) cursos.add(r.item_id);
    else if (r.tipo === "ebook" && r.item_id) ebooks.add(r.item_id);
  }
  return { cursos: [...cursos], ebooks: [...ebooks], colecao };
}

/**
 * Carteira (Acessos) do usuário logado, lida NO SERVIDOR sob RLS.
 * NUNCA lança: qualquer erro (sem env, sem login, tabela inexistente) → visitante.
 * React.cache: 1 leitura por requisição serve todos os componentes.
 */
export const getAcessos = cache(async (): Promise<Acessos> => {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key || key.startsWith("COLE_")) return ACESSOS_VISITANTE;

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return ACESSOS_VISITANTE;

    // Dono/admin vê tudo pelo caminho legítimo (não por backdoor de compra).
    if (isAdmin(user.email)) return ACESSO_TOTAL;

    // SELECT já sob RLS (só as linhas do próprio usuário).
    const { data, error } = await supabase
      .from("compras")
      .select("tipo, item_id, status")
      .eq("status", "confirmado");

    // Falha de leitura → FECHA tudo (nunca libera acesso por engano).
    if (error) return ACESSOS_VISITANTE;

    // Carteira vazia já resulta em visitante (cursos/ebooks vazios, colecao=false).
    return fold((data ?? []) as CompraRow[]);
  } catch {
    return ACESSOS_VISITANTE;
  }
});
