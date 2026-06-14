import { cursos, BUNDLE } from "./courses";

// Catálogo de venda. O PREÇO mora aqui (servidor) — NUNCA vem do cliente, pra
// ninguém manipular o valor no checkout. Deriva de courses.ts/BUNDLE.
export type Produto = {
  tipo: "curso" | "colecao";
  value: number; // em reais
  nome: string;
  itemId: string | null; // id do protocolo; null na coleção
};

export function getProduto(itemId: string): Produto | null {
  if (itemId === "colecao") {
    return { tipo: "colecao", value: BUNDLE.preco, nome: BUNDLE.titulo, itemId: null };
  }
  const c = cursos.find((x) => x.id === itemId);
  if (c) {
    return { tipo: "curso", value: c.preco, nome: `Protocolo ${c.regiao} ${c.tagline}`, itemId: c.id };
  }
  return null;
}
