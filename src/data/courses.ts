// Dados dos 9 protocolos de recuperação esportiva — PER4MANCE by Gustavo Vieira
// Esta é a "fonte de verdade" do catálogo. Os MÓDULOS são as 6 fichas reais do
// método (90 dias em 3 fases), vindas de src/data/fichas.ts.
import { FICHAS, type Exercicio } from "./fichas";

export type { Exercicio };

// Cada módulo = uma FICHA real (15 dias). num 1..6, com fase, dias e exercícios.
export type Modulo = {
  num: number;
  titulo: string;
  fase: string; // "Fase 1" | "Fase 2" | "Fase 3"
  dias: string; // "1-15"
  exercicios: Exercicio[];
  pandaId?: string; // preenchido quando o vídeo da ficha é cadastrado no admin
};

// Monta os 6 módulos (fichas reais) de um protocolo.
function modulosDe(cursoId: string): Modulo[] {
  return (FICHAS[cursoId] ?? []).map((f) => ({
    num: f.num,
    titulo: f.titulo,
    fase: f.fase,
    dias: f.dias,
    exercicios: f.exercicios,
  }));
}

export type Curso = {
  id: string; // slug usado na URL: /curso/joelho
  num: string; // "01"
  regiao: string; // "Joelho"
  tagline: string; // "De Aço"
  subtitulo: string;
  cor: string; // cor de acento (hex)
  capa: string; // caminho em /public
  preco: number; // 97
  duracaoTotal: string;
  nivel: string;
  categoria?: "protocolo" | "profissional"; // "protocolo" (padrão) = os 9 de recuperação
  destaque?: boolean;
  maisVendido?: boolean;
  descricao: string;
  paraQuem: string[];
  modulos: Modulo[];
};

export const cursos: Curso[] = [
  {
    id: "joelho",
    num: "01",
    regiao: "Joelho",
    tagline: "De Aço",
    subtitulo: "Protocolo completo de recuperação e blindagem do joelho",
    cor: "#b5e000",
    capa: "/capas/joelho.jpg",
    preco: 97,
    duracaoTotal: "1h 28min",
    nivel: "Iniciante → Avançado",
    destaque: true,
    maisVendido: true,
    descricao:
      "O protocolo mais buscado da PER4MANCE. Da dor anterior do joelho ao retorno completo aos treinos: avaliação, controle de dor, fortalecimento de quadríceps e estabilização de patela em um passo a passo de fisioterapia esportiva aplicada.",
    paraQuem: [
      "Atletas com dor anterior do joelho ou condromalácia",
      "Pós-operatório de LCA / menisco (com liberação médica)",
      "Quem sente o joelho 'falhar' em saltos e mudanças de direção",
    ],
    modulos: modulosDe("joelho"),
  },
  {
    id: "tornozelo",
    num: "02",
    regiao: "Tornozelo",
    tagline: "Pisada Forte",
    subtitulo: "Estabilidade e força para um tornozelo à prova de entorses",
    cor: "#00c8f0",
    capa: "/capas/tornozelo.webp",
    preco: 97,
    duracaoTotal: "1h 22min",
    nivel: "Iniciante → Avançado",
    descricao:
      "Entorse não pode virar rotina. Protocolo de propriocepção, mobilidade e fortalecimento para devolver estabilidade ao tornozelo e acabar com o medo de pisar em falso.",
    paraQuem: [
      "Atletas com histórico de entorses repetidas",
      "Quem sente instabilidade ao correr em terreno irregular",
      "Pós-entorse buscando retorno seguro ao esporte",
    ],
    modulos: modulosDe("tornozelo"),
  },
  {
    id: "lombar",
    num: "03",
    regiao: "Lombar",
    tagline: "Que Não Trava",
    subtitulo: "Alívio e fortalecimento para a coluna lombar",
    cor: "#f97316",
    capa: "/capas/lombar.jpg",
    preco: 97,
    duracaoTotal: "1h 35min",
    nivel: "Iniciante → Avançado",
    descricao:
      "Aquela lombar que trava no meio do treino tem solução. Protocolo de controle de dor, mobilidade de coluna e fortalecimento de core para devolver liberdade de movimento ao seu dia a dia e ao esporte.",
    paraQuem: [
      "Quem sofre com lombalgia recorrente",
      "Atletas de força e levantamento com dor na região",
      "Quem trava a lombar em movimentos simples do dia a dia",
    ],
    modulos: modulosDe("lombar"),
  },
  {
    id: "posterior",
    num: "04",
    regiao: "Posterior",
    tagline: "Sem Fisgada",
    subtitulo: "Recuperação dos isquiotibiais e fim das fisgadas",
    cor: "#ff2d87",
    capa: "/capas/posterior.webp",
    preco: 97,
    duracaoTotal: "1h 18min",
    nivel: "Iniciante → Avançado",
    descricao:
      "A lesão que mais afasta atletas dos gramados. Protocolo nórdico e excêntrico progressivo para recuperar os isquiotibiais e blindar a coxa posterior contra fisgadas e estiramentos.",
    paraQuem: [
      "Atletas de corrida e esportes de explosão",
      "Quem já teve estiramento de posterior de coxa",
      "Pós-lesão buscando voltar a sprintar com segurança",
    ],
    modulos: modulosDe("posterior"),
  },
  {
    id: "pubalgia",
    num: "05",
    regiao: "Pubalgia",
    tagline: "O Fim Dela",
    subtitulo: "Protocolo definitivo contra a pubalgia",
    cor: "#9333ea",
    capa: "/capas/pubalgia.jpg",
    preco: 97,
    duracaoTotal: "1h 40min",
    nivel: "Intermediário → Avançado",
    descricao:
      "Uma das dores mais traiçoeiras do esporte. Protocolo integrado de adutores, core e quadril para tratar a pubalgia na raiz e devolver potência aos chutes e mudanças de direção.",
    paraQuem: [
      "Jogadores de futebol e esportes de chute",
      "Atletas com dor na virilha que não passa",
      "Quem já tentou de tudo contra a pubalgia",
    ],
    modulos: modulosDe("pubalgia"),
  },
  {
    id: "panturrilha",
    num: "06",
    regiao: "Panturrilha",
    tagline: "Sem Ruptura",
    subtitulo: "Força e resistência para panturrilhas blindadas",
    cor: "#f5c518",
    capa: "/capas/panturrilha.jpeg",
    preco: 97,
    duracaoTotal: "1h 12min",
    nivel: "Iniciante → Avançado",
    descricao:
      "Câimbras, sobrecarga e o risco de ruptura do tendão de Aquiles. Protocolo de fortalecimento e resistência para panturrilhas que aguentam o jogo inteiro sem falhar.",
    paraQuem: [
      "Corredores e atletas de longa duração",
      "Quem sofre com câimbras frequentes",
      "Pós-lesão de tendão de Aquiles ou panturrilha",
    ],
    modulos: modulosDe("panturrilha"),
  },
  {
    id: "quadril",
    num: "07",
    regiao: "Quadril",
    tagline: "Desbloqueado",
    subtitulo: "Mobilidade e força para um quadril livre",
    cor: "#22c55e",
    capa: "/capas/quadril.jpg",
    preco: 97,
    duracaoTotal: "1h 30min",
    nivel: "Iniciante → Avançado",
    descricao:
      "Quadril travado rouba potência e sobrecarrega joelho e lombar. Protocolo de mobilidade, ativação de glúteos e estabilização para destravar o quadril e melhorar todo o seu rendimento.",
    paraQuem: [
      "Atletas com perda de mobilidade no quadril",
      "Quem tem dor que vem do quadril e reflete em joelho/lombar",
      "Quem quer mais potência em agachamentos e saltos",
    ],
    modulos: modulosDe("quadril"),
  },
  {
    id: "ombro",
    num: "08",
    regiao: "Ombro",
    tagline: "Sem Dor",
    subtitulo: "Recuperação e estabilidade do manguito rotador",
    cor: "#ef4444",
    capa: "/capas/ombro.jpeg",
    preco: 97,
    duracaoTotal: "1h 26min",
    nivel: "Iniciante → Avançado",
    descricao:
      "Do impacto ao manguito rotador: protocolo de mobilidade escapular, fortalecimento e estabilização para recuperar o ombro e voltar a arremessar, nadar e treinar sem dor.",
    paraQuem: [
      "Atletas de arremesso, natação e ginástica",
      "Quem sente dor ao elevar o braço",
      "Pós-lesão de manguito rotador ou luxação",
    ],
    modulos: modulosDe("ombro"),
  },
  {
    id: "quadriceps",
    num: "09",
    regiao: "Quadríceps",
    tagline: "Potência Total",
    subtitulo: "Reconstrução de força e potência do quadríceps",
    cor: "#38bdf8",
    capa: "/capas/quadriceps.webp",
    preco: 97,
    duracaoTotal: "1h 33min",
    nivel: "Intermediário → Avançado",
    descricao:
      "O motor da explosão do atleta. Protocolo de recuperação e potencialização do quadríceps para gerar mais força em saltos, sprints e mudanças de direção, com a coxa protegida.",
    paraQuem: [
      "Atletas de explosão e velocidade",
      "Quem busca mais potência de salto e arranque",
      "Pós-lesão de quadríceps ou tendão patelar",
    ],
    modulos: modulosDe("quadriceps"),
  },
  {
    id: "avaliacao-360",
    num: "P1",
    regiao: "Avaliação 360°",
    tagline: "Para Profissionais",
    subtitulo: "Avalie e prescreva treino de qualidade — curso para profissionais de Educação Física",
    cor: "#1d6fe8",
    capa: "/produtos/p2.png",
    preco: 547,
    duracaoTotal: "Curso completo",
    nivel: "Profissional",
    categoria: "profissional",
    descricao:
      "Curso para profissionais de Educação Física e personal trainers: aprenda a avaliar seu aluno de ponta a ponta e a prescrever um treino de qualidade, com método e segurança.",
    paraQuem: [
      "Personal trainers e profissionais de Educação Física",
      "Quem quer avaliar e prescrever com método e critério",
      "Quem busca entregar mais resultado e segurança ao aluno",
    ],
    modulos: [],
  },
  {
    id: "fisiologia-esporte",
    num: "P2",
    regiao: "Fisiologia",
    tagline: "do Exercício",
    subtitulo: "Fisiologia do Exercício básica por esporte — as respostas do corpo ao treino, aplicadas à modalidade.",
    cor: "#e2445c",
    capa: "/produtos/fisiologia-esporte.png",
    preco: 297,
    duracaoTotal: "Curso completo",
    nivel: "Profissional",
    categoria: "profissional",
    descricao:
      "Entenda como o corpo responde ao esforço — energia, coração, músculo e fadiga — e traduza isso em treino inteligente para cada esporte. Curso para profissionais de Educação Física e treinadores.",
    paraQuem: [
      "Personal trainers e profissionais de Educação Física",
      "Treinadores que querem prescrever com base fisiológica",
      "Quem quer entender o 'porquê' de cada estímulo de treino",
    ],
    modulos: [],
  },
  {
    id: "biomecanica-esporte",
    num: "P3",
    regiao: "Biomecânica",
    tagline: "pro Esporte",
    subtitulo: "Biomecânica básica pro esporte — forças, alavancas e articulações aplicadas ao gesto esportivo.",
    cor: "#8b5cf6",
    capa: "/produtos/biomecanica-esporte.png",
    preco: 297,
    duracaoTotal: "Curso completo",
    nivel: "Profissional",
    categoria: "profissional",
    descricao:
      "Os fundamentos do movimento humano sem complicação: como as forças agem no corpo, como as articulações trabalham e como usar isso para treinar com mais eficiência e segurança.",
    paraQuem: [
      "Personal trainers e profissionais de Educação Física",
      "Treinadores que querem entender o gesto esportivo",
      "Quem quer reduzir risco de lesão na prescrição",
    ],
    modulos: [],
  },
  {
    id: "avaliacao-postural",
    num: "P4",
    regiao: "Avaliação Postural",
    tagline: "Para Profissionais",
    subtitulo: "Avaliação Postural — leia o corpo do aluno: simetrias, desvios e compensações.",
    cor: "#06b6d4",
    capa: "/produtos/avaliacao-postural.png",
    preco: 297,
    duracaoTotal: "Curso completo",
    nivel: "Profissional",
    categoria: "profissional",
    descricao:
      "Aprenda a avaliar a postura do seu aluno de forma objetiva: pontos de referência, vistas, desvios mais comuns e o que cada achado significa para a sua prescrição.",
    paraQuem: [
      "Personal trainers e profissionais de Educação Física",
      "Quem quer uma avaliação inicial mais completa",
      "Profissionais que trabalham com correção e reabilitação",
    ],
    modulos: [],
  },
  {
    id: "avaliacao-funcional",
    num: "P5",
    regiao: "Avaliação Funcional",
    tagline: "do Movimento",
    subtitulo: "Avaliação Funcional do Movimento — triagem dos padrões que limitam o seu aluno.",
    cor: "#f59e0b",
    capa: "/produtos/avaliacao-funcional.png",
    preco: 297,
    duracaoTotal: "Curso completo",
    nivel: "Profissional",
    categoria: "profissional",
    descricao:
      "Avalie a qualidade do movimento: triagem dos principais padrões, identificação de limitações e como usar os resultados para individualizar o treino.",
    paraQuem: [
      "Personal trainers e profissionais de Educação Física",
      "Treinadores que querem prescrever a partir do movimento",
      "Quem busca individualizar o treino com critério",
    ],
    modulos: [],
  },
  {
    id: "performance-potencia",
    num: "P6",
    regiao: "Performance",
    tagline: "Potência no Esporte",
    subtitulo: "Avaliações de Performance e Potência — teste, monitore e desenvolva o rendimento.",
    cor: "#10b981",
    capa: "/produtos/performance-potencia.png",
    preco: 297,
    duracaoTotal: "Curso completo",
    nivel: "Profissional",
    categoria: "profissional",
    descricao:
      "Os principais testes de performance e potência no esporte: o que medir, como aplicar e como transformar os números em decisão de treino para evoluir o atleta.",
    paraQuem: [
      "Personal trainers e profissionais de Educação Física",
      "Treinadores e preparadores físicos",
      "Quem trabalha com atletas e quer medir evolução",
    ],
    modulos: [],
  },
];

// Subconjuntos por categoria.
export const protocolos = cursos.filter((c) => (c.categoria ?? "protocolo") === "protocolo");
export const cursosProfissionais = cursos.filter((c) => c.categoria === "profissional");

export const BUNDLE = {
  titulo: "Coleção Completa PER4MANCE",
  subtitulo: "Todos os 9 protocolos de recuperação em um único acesso",
  preco: 547,
  precoDe: 873,
  parcelas: "10x de R$ 54,70",
};

export function getCurso(id: string): Curso | undefined {
  return cursos.find((c) => c.id === id);
}

export function getCursos(ids: string[]): Curso[] {
  return ids.map((id) => getCurso(id)).filter(Boolean) as Curso[];
}

export function formatBRL(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
