import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { BUNDLE, getCurso } from "@/data/courses";

export type Aluno = {
  id: string;
  email: string;
  nome: string;
  criadoEm: string;
  ultimoLogin: string | null;
};

export type Venda = {
  id: string;
  data: string;
  email: string;
  produto: string;
  valor: number;
  status: string;
};

export type Resumo = {
  alunos: number;
  vendasConfirmadas: number;
  faturamento: number;
  pendentes: number;
  estornos: number;
};

function valorDe(tipo: string, itemId: string | null): number {
  if (tipo === "colecao") return BUNDLE.preco;
  if (tipo === "curso" && itemId) return getCurso(itemId)?.preco ?? 0;
  return 0;
}

function nomeProduto(tipo: string, itemId: string | null): string {
  if (tipo === "colecao") return BUNDLE.titulo;
  if (tipo === "curso" && itemId) {
    const c = getCurso(itemId);
    return c ? `Protocolo ${c.regiao}` : itemId;
  }
  return itemId ?? tipo;
}

// Lista os alunos cadastrados (Supabase Auth). Nunca lança.
export async function getAlunos(): Promise<Aluno[]> {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin.auth.admin.listUsers({ perPage: 1000 });
    if (error || !data) return [];
    return data.users.map((u) => ({
      id: u.id,
      email: u.email ?? "(sem e-mail)",
      nome: (u.user_metadata?.nome as string) ?? "",
      criadoEm: u.created_at,
      ultimoLogin: u.last_sign_in_at ?? null,
    }));
  } catch {
    return [];
  }
}

// Vendas (compras) + resumo financeiro. Nunca lança.
export async function getVendasEResumo(): Promise<{ vendas: Venda[]; resumo: Resumo }> {
  const vazio: Resumo = {
    alunos: 0,
    vendasConfirmadas: 0,
    faturamento: 0,
    pendentes: 0,
    estornos: 0,
  };
  try {
    const admin = createAdminClient();
    const alunos = await getAlunos();
    const email = new Map(alunos.map((a) => [a.id, a.email]));
    const { data } = await admin
      .from("compras")
      .select("id, user_id, tipo, item_id, status, created_at")
      .order("created_at", { ascending: false });

    const linhas = (data ?? []) as {
      id: string;
      user_id: string;
      tipo: string;
      item_id: string | null;
      status: string;
      created_at: string;
    }[];

    const vendas: Venda[] = linhas.map((r) => ({
      id: r.id,
      data: r.created_at,
      email: email.get(r.user_id) ?? "—",
      produto: nomeProduto(r.tipo, r.item_id),
      valor: valorDe(r.tipo, r.item_id),
      status: r.status,
    }));

    const conf = vendas.filter((v) => v.status === "confirmado");
    const resumo: Resumo = {
      alunos: alunos.length,
      vendasConfirmadas: conf.length,
      faturamento: conf.reduce((s, v) => s + v.valor, 0),
      pendentes: vendas.filter((v) => v.status === "pendente").length,
      estornos: vendas.filter((v) => v.status === "estornado").length,
    };
    return { vendas, resumo };
  } catch {
    return { vendas: [], resumo: vazio };
  }
}

// Detalhe de um aluno.
export async function getAluno(id: string): Promise<Aluno | null> {
  try {
    const admin = createAdminClient();
    const { data, error } = await admin.auth.admin.getUserById(id);
    if (error || !data?.user) return null;
    const u = data.user;
    return {
      id: u.id,
      email: u.email ?? "",
      nome: (u.user_metadata?.nome as string) ?? "",
      criadoEm: u.created_at,
      ultimoLogin: u.last_sign_in_at ?? null,
    };
  } catch {
    return null;
  }
}

export type MensagemAdmin = { id: string; texto: string; created_at: string; lida: boolean };

export async function getMensagensDoAluno(id: string): Promise<MensagemAdmin[]> {
  try {
    const admin = createAdminClient();
    const { data } = await admin
      .from("mensagens")
      .select("id, texto, created_at, lida")
      .eq("user_id", id)
      .order("created_at", { ascending: false });
    return (data ?? []) as MensagemAdmin[];
  } catch {
    return [];
  }
}

export type AnexoAluno = { id: string; nome: string; created_at: string };

export async function getAnexosDoAluno(id: string): Promise<AnexoAluno[]> {
  try {
    const admin = createAdminClient();
    const { data } = await admin
      .from("anexos")
      .select("id, nome, created_at")
      .eq("user_id", id)
      .order("created_at", { ascending: false });
    return (data ?? []) as AnexoAluno[];
  } catch {
    return [];
  }
}

export async function getComprasDoAluno(
  id: string,
): Promise<{ produto: string; status: string; data: string }[]> {
  try {
    const admin = createAdminClient();
    const { data } = await admin
      .from("compras")
      .select("tipo, item_id, status, created_at")
      .eq("user_id", id)
      .order("created_at", { ascending: false });
    const linhas = (data ?? []) as {
      tipo: string;
      item_id: string | null;
      status: string;
      created_at: string;
    }[];
    return linhas.map((r) => ({
      produto: nomeProduto(r.tipo, r.item_id),
      status: r.status,
      data: r.created_at,
    }));
  } catch {
    return [];
  }
}
