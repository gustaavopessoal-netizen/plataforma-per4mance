// E-books PER4MANCE para download dentro da plataforma.
// Os PDFs reais já estão em /public/ebooks/. Os TÍTULOS abaixo são sugestões
// baseadas no tema de cada arquivo — Gustavo confirma/ajusta os nomes finais.

export type Ebook = {
  id: string;
  titulo: string;
  categoria: "Recuperação" | "Performance" | "Mente";
  cor: string;
  arquivo: string; // caminho do PDF em /public
  descricao: string;
};

export const ebooks: Ebook[] = [
  {
    id: "protocolo",
    titulo: "Protocolo de Recuperação Esportiva",
    categoria: "Recuperação",
    cor: "#b5e000",
    arquivo: "/ebooks/protocolo.pdf",
    descricao: "O passo a passo da recuperação esportiva bem feita, do dia da lesão ao retorno.",
  },
  {
    id: "sono",
    titulo: "Sono & Performance",
    categoria: "Recuperação",
    cor: "#1d6fe8",
    arquivo: "/ebooks/sono.pdf",
    descricao: "Como usar o sono como a sua ferramenta nº 1 de recuperação e ganho de performance.",
  },
  {
    id: "aquece",
    titulo: "Aquecimento que Previne Lesão",
    categoria: "Recuperação",
    cor: "#f97316",
    arquivo: "/ebooks/aquece.pdf",
    descricao: "O aquecimento certo para preparar o corpo e reduzir o risco de lesão.",
  },
  {
    id: "volta",
    titulo: "Volta à Calma: Recovery Pós-Treino",
    categoria: "Recuperação",
    cor: "#ef4444",
    arquivo: "/ebooks/volta.pdf",
    descricao: "O que fazer depois do treino para recuperar mais rápido e render mais amanhã.",
  },
  {
    id: "frio",
    titulo: "Recuperação no Frio",
    categoria: "Recuperação",
    cor: "#00c8f0",
    arquivo: "/ebooks/frio.pdf",
    descricao: "Crioterapia, banho gelado e o uso inteligente do frio na recuperação.",
  },
  {
    id: "estresse",
    titulo: "Estresse & Recuperação",
    categoria: "Mente",
    cor: "#9333ea",
    arquivo: "/ebooks/estresse.pdf",
    descricao: "Como o estresse sabota a sua recuperação e o que fazer para controlá-lo.",
  },
  {
    id: "mente",
    titulo: "Mente de Alta Performance",
    categoria: "Mente",
    cor: "#ff2d87",
    arquivo: "/ebooks/mente.pdf",
    descricao: "O lado mental do atleta: foco, confiança e cabeça no jogo.",
  },
  {
    id: "f40",
    titulo: "Alta Performance Após os 40",
    categoria: "Performance",
    cor: "#38bdf8",
    arquivo: "/ebooks/f40.pdf",
    descricao: "Treinar, recuperar e performar com inteligência depois dos 40 anos.",
  },
  {
    id: "corpo",
    titulo: "Leitura Corporal do Atleta",
    categoria: "Performance",
    cor: "#22c55e",
    arquivo: "/ebooks/corpo.pdf",
    descricao: "Aprenda a ler os sinais do corpo antes que eles virem lesão.",
  },
  {
    id: "numero",
    titulo: "Os Números da Recuperação",
    categoria: "Performance",
    cor: "#f5c518",
    arquivo: "/ebooks/numero.pdf",
    descricao: "As métricas que realmente importam para acompanhar a sua evolução.",
  },
  {
    id: "ebook",
    titulo: "Guia PER4MANCE de Recuperação",
    categoria: "Recuperação",
    cor: "#f26d40",
    arquivo: "/ebooks/ebook.pdf",
    descricao: "O guia introdutório da metodologia PER4MANCE de recuperação esportiva.",
  },
];

export function getEbook(id: string): Ebook | undefined {
  return ebooks.find((e) => e.id === id);
}
