// Cupons de desconto do Universo PER4MANCE.
// O desconto é aplicado NO SERVIDOR (api/checkout) — nunca confiar no cliente.
// - 50% → gera a cobrança no Asaas pela metade do preço.
// - 100% → libera o acesso na hora, SEM cobrança (ótimo para você testar de graça
//   ou dar acesso de cortesia). Vale para qualquer compra (protocolo, e-book, coleção).
//
// Para criar/!trocar códigos, edite a lista abaixo. Deixe os códigos em MAIÚSCULAS.

export type Cupom = {
  codigo: string;
  descontoPct: number; // 50 ou 100
};

export const cupons: Cupom[] = [
  { codigo: "PER4MANCE50", descontoPct: 50 },
  { codigo: "PER4MANCE100", descontoPct: 100 },
];

export function getCupom(codigo: string): Cupom | null {
  const c = (codigo ?? "").trim().toUpperCase();
  if (!c) return null;
  return cupons.find((x) => x.codigo.toUpperCase() === c) ?? null;
}
