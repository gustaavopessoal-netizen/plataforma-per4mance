import { cursos, BUNDLE, BUNDLE_PROF, COLECAO_PROF_ID } from "./courses";
import { ebooks } from "./ebooks";

// Preço do e-book avulso (R$ 14,99).
export const EBOOK_PRECO = 14.99;

// Catálogo de venda. O PREÇO mora aqui (servidor) — NUNCA vem do cliente, pra
// ninguém manipular o valor no checkout. Deriva de courses.ts/BUNDLE/ebooks.
export type Produto = {
  tipo: "curso" | "colecao" | "ebook";
  value: number; // em reais
  nome: string;
  itemId: string | null; // id do protocolo/ebook; null na coleção
};

export function getProduto(itemId: string): Produto | null {
  if (itemId === "colecao") {
    return { tipo: "colecao", value: BUNDLE.preco, nome: BUNDLE.titulo, itemId: null };
  }
  // Combo profissional: registra como "curso" com item_id especial — o acesso
  // (access.ts) reconhece esse id e libera TODOS os cursos profissionais.
  if (itemId === COLECAO_PROF_ID) {
    return { tipo: "curso", value: BUNDLE_PROF.preco, nome: BUNDLE_PROF.titulo, itemId: COLECAO_PROF_ID };
  }
  const c = cursos.find((x) => x.id === itemId);
  if (c) {
    return { tipo: "curso", value: c.preco, nome: `Protocolo ${c.regiao} ${c.tagline}`, itemId: c.id };
  }
  const e = ebooks.find((x) => x.id === itemId);
  if (e) {
    return { tipo: "ebook", value: EBOOK_PRECO, nome: `E-book: ${e.titulo}`, itemId: e.id };
  }
  return null;
}
