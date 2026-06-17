// Regras de acesso da plataforma — PROTOCOLOS e E-BOOKS.
//
// Este módulo é ISOMÓRFICO (server + client): só REGRAS puras, sem I/O e sem
// sessão. A "carteira" (Acessos) do usuário logado é carregada NO SERVIDOR por
// src/data/entitlements.ts (getAcessos) e distribuída pela árvore via
// <AcessosProvider> (src/components/AcessosProvider.tsx).
//
// Acessos = o que o cliente COMPROU:
//   - cursos:  ids de protocolos comprados avulsos (ex.: ["joelho"])
//   - ebooks:  ids de e-books comprados avulsos
//   - colecao: comprou a Coleção Completa (os 9 protocolos) → libera TODOS os
//              protocolos E todos os e-books de bônus (a promoção).
//
// Tudo nasce FECHADO: sem compra, nada abre. Visitante = ACESSOS_VISITANTE.

import { protocolos, cursosProfissionais, COLECAO_PROF_ID } from "./courses";
import { ebooks } from "./ebooks";

export type Acessos = {
  cursos: string[];
  ebooks: string[];
  colecao: boolean;
};

// Fallback: ninguém logado / nada comprado → tudo trancado.
export const ACESSOS_VISITANTE: Acessos = { cursos: [], ebooks: [], colecao: false };

// Tem a Coleção? Flag direta OU juntou TODOS os protocolos avulsos.
// Amarrado a `cursos` (catálogo) para nunca dessincronizar com a contagem real.
export function temColecao(a: Acessos): boolean {
  return a.colecao || protocolos.every((c) => a.cursos.includes(c.id));
}

// Tem o Combo Profissional? Flag direta (item_id especial) OU juntou TODOS os
// cursos profissionais avulsos.
export function temColecaoProf(a: Acessos): boolean {
  return (
    a.cursos.includes(COLECAO_PROF_ID) ||
    (cursosProfissionais.length > 0 && cursosProfissionais.every((c) => a.cursos.includes(c.id)))
  );
}

// CURSO liberado para esta carteira?
//  - protocolos de atleta: abrem com a Coleção dos 9 ou comprados avulsos;
//  - cursos profissionais: abrem com o Combo Profissional ou comprados avulsos.
export function cursoLiberado(a: Acessos, id: string): boolean {
  const ehProtocolo = protocolos.some((c) => c.id === id);
  const ehProf = cursosProfissionais.some((c) => c.id === id);
  return (
    (ehProtocolo && temColecao(a)) ||
    (ehProf && temColecaoProf(a)) ||
    a.cursos.includes(id)
  );
}

// E-BOOK liberado? (ter a Coleção libera todos os e-books de bônus)
export function ebookLiberado(a: Acessos, id: string): boolean {
  return temColecao(a) || a.ebooks.includes(id);
}

// Resumo para banners / página de conta.
export function resumoAcessos(a: Acessos) {
  const colecao = temColecao(a);
  return {
    colecao,
    totalCursos: colecao ? protocolos.length : a.cursos.length,
    totalEbooks: colecao ? ebooks.length : a.ebooks.length,
  };
}
