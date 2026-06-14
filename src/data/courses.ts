// Dados dos 9 protocolos de recuperação esportiva — PER4MANCE by Gustavo Vieira
// Esta é a "fonte de verdade" do catálogo. Na Fase 4 cada módulo recebe o ID
// do vídeo no Panda Video (campo `pandaId`).

export type Modulo = {
  num: number;
  titulo: string;
  duracao: string; // ex: "12 min"
  descricao: string;
  pandaId?: string; // preenchido na Fase 4 (Panda Video)
};

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
  destaque?: boolean;
  maisVendido?: boolean;
  descricao: string;
  paraQuem: string[];
  modulos: Modulo[];
};

// Estrutura padrão de protocolo (6 módulos), com a região costurada no texto.
function protocolo(regiao: string, focos: string[]): Modulo[] {
  return [
    {
      num: 1,
      titulo: "Avaliação e Diagnóstico Funcional",
      duracao: "14 min",
      descricao: `Como avaliar ${regiao.toLowerCase()} com testes simples e identificar a real origem da dor antes de treinar.`,
    },
    {
      num: 2,
      titulo: "Controle de Dor e Inflamação",
      duracao: "11 min",
      descricao: `Protocolo das primeiras 72h: o que fazer e o que evitar para proteger ${focos[0]}.`,
    },
    {
      num: 3,
      titulo: "Mobilidade e Amplitude",
      duracao: "16 min",
      descricao: `Sequência de mobilidade para recuperar amplitude de movimento sem sobrecarregar ${focos[1]}.`,
    },
    {
      num: 4,
      titulo: "Fortalecimento Progressivo",
      duracao: "19 min",
      descricao: `Progressão de carga em 4 fases para reconstruir força de ${focos[2]} com segurança.`,
    },
    {
      num: 5,
      titulo: "Estabilidade e Controle Motor",
      duracao: "15 min",
      descricao: `Exercícios de estabilização e propriocepção para blindar ${regiao.toLowerCase()} contra recaídas.`,
    },
    {
      num: 6,
      titulo: "Retorno ao Esporte (Return to Play)",
      duracao: "13 min",
      descricao: `Critérios objetivos e testes finais para voltar a treinar e competir com confiança.`,
    },
  ];
}

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
    modulos: protocolo("Joelho", ["a articulação", "a patela", "o quadríceps"]),
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
    modulos: protocolo("Tornozelo", ["os ligamentos", "a articulação", "a panturrilha"]),
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
    modulos: protocolo("Lombar", ["a coluna", "o quadril", "o core"]),
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
    modulos: protocolo("Posterior de coxa", ["o tendão", "o quadril", "os isquiotibiais"]),
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
    modulos: protocolo("Região púbica", ["os adutores", "o quadril", "o core"]),
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
    modulos: protocolo("Panturrilha", ["o tendão de Aquiles", "o tornozelo", "o tríceps sural"]),
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
    modulos: protocolo("Quadril", ["a articulação", "os glúteos", "os rotadores"]),
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
    modulos: protocolo("Ombro", ["o manguito rotador", "a escápula", "o deltoide"]),
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
    modulos: protocolo("Quadríceps", ["o tendão patelar", "o joelho", "a coxa anterior"]),
  },
];

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
