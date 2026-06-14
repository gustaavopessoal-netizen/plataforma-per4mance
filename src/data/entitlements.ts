import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { ACESSOS_VISITANTE, type Acessos } from "./access";

// ⚠️ PONTE TEMPORÁRIA — removida na Fase 3 (quando o webhook do Asaas passa a
// preencher a tabela `compras`). Serve para você JÁ conseguir logar e ver a
// plataforma "liberada" antes do pagamento existir. Compras REAIS sempre vencem
// esta ponte. Edite os e-mails/itens conforme quiser testar:
const DEMO_GRANTS: Record<string, Acessos> = {
  // O dono enxerga tudo (equivale a ter a Coleção Completa):
  "gustaavopessoal@gmail.com": { cursos: [], ebooks: [], colecao: true },
  // Exemplos — crie a conta e ajuste:
  // "ricardo@teste.com": { cursos: ["joelho"], ebooks: [], colecao: false },
};

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

    // SELECT já sob RLS (só as linhas do próprio usuário).
    const { data, error } = await supabase
      .from("compras")
      .select("tipo, item_id, status")
      .eq("status", "confirmado");

    // Tabela ainda não existe (antes da Fase 3) ou erro → ponte demo por e-mail.
    if (error) return DEMO_GRANTS[user.email ?? ""] ?? ACESSOS_VISITANTE;

    const acessos = fold((data ?? []) as CompraRow[]);
    const vazio =
      !acessos.colecao && acessos.cursos.length === 0 && acessos.ebooks.length === 0;
    if (vazio) return DEMO_GRANTS[user.email ?? ""] ?? ACESSOS_VISITANTE;

    return acessos;
  } catch {
    return ACESSOS_VISITANTE;
  }
});
