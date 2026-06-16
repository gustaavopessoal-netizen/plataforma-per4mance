// Produtos do hub PER4MANCE (seuproximonivelestaaqui.com.br) trazidos para dentro
// da plataforma. Alguns abrem páginas internas, outros levam para links externos
// (formulário, WhatsApp) que já existem hoje.

export type Programa = {
  id: string;
  num: string;
  tipo: "programa" | "servico" | "mentoria" | "comunidade";
  eyebrow: string; // linha pequena acima do título
  titulo: string;
  subtitulo: string;
  descricao: string;
  cor: string;
  banner?: string; // imagem designada (p1..p4) usada na página interna
  badge?: string; // "90 dias" | "Em breve" | "Gratuito"
  externo: boolean; // true => card abre `url` em nova aba; false => página interna
  url?: string; // link externo (quando externo=true) ou CTA da página interna
  cta: string;
  destaques: string[];
};

export const programas: Programa[] = [
  {
    id: "de-volta-ao-jogo",
    num: "01",
    tipo: "programa",
    eyebrow: "Programa de 90 dias",
    titulo: "De Volta ao Jogo",
    subtitulo: "O método completo para o atleta voltar a competir mais forte",
    descricao:
      "O carro-chefe da PER4MANCE. Um programa de 90 dias que conduz o atleta lesionado da dor ao retorno em alta performance, unindo recuperação, fortalecimento e preparação física em um plano semana a semana.",
    cor: "#f26d40",
    banner: "/produtos/p1.png",
    badge: "90 dias",
    externo: true,
    url: "https://devoltaaojogo90dias.com",
    cta: "Quero voltar ao jogo",
    destaques: [
      "Plano estruturado de 90 dias, semana a semana",
      "Da fase de dor ao retorno ao esporte (return to play)",
      "Acompanhamento de carga, recuperação e performance",
      "Ideal para pós-lesão e pós-cirúrgico liberado",
    ],
  },
  {
    id: "avaliacao-360",
    num: "02",
    tipo: "servico",
    eyebrow: "Avaliação completa",
    titulo: "Avaliação 360°",
    subtitulo: "O raio-x completo do seu corpo e da sua performance",
    descricao:
      "Uma avaliação física e funcional 360° para mapear forças, fraquezas, riscos de lesão e pontos de evolução. A base para qualquer protocolo ou programa ser realmente personalizado.",
    cor: "#1d6fe8",
    banner: "/produtos/p2.png",
    badge: "Em breve",
    externo: true,
    url: "https://wa.me/5531993290622?text=Ol%C3%A1%20Gustavo!%20Quero%20entrar%20na%20fila%20de%20espera%20da%20Avalia%C3%A7%C3%A3o%20360.",
    cta: "Entrar na fila de espera",
    destaques: [
      "Avaliação física e funcional completa",
      "Mapa de risco de lesão por região",
      "Relatório com plano de evolução individualizado",
      "Base para personalizar protocolos e programas",
    ],
  },
  {
    id: "mentoria-empresarial",
    num: "03",
    tipo: "mentoria",
    eyebrow: "Para profissionais & gestores",
    titulo: "Mentoria Empresarial",
    subtitulo: "Estruture e escale o seu negócio na área esportiva",
    descricao:
      "Mentoria para profissionais de educação física e donos de estúdio que querem transformar conhecimento técnico em um negócio sólido e lucrativo, com método e direção.",
    cor: "#9099aa",
    banner: "/produtos/p3.png",
    externo: true,
    url: "https://form.respondi.app/uKBaR95Q",
    cta: "Aplicar para a mentoria",
    destaques: [
      "Para profissionais de ed. física e donos de estúdio",
      "Estruturação e escala do negócio",
      "Acompanhamento estratégico com método",
    ],
  },
  {
    id: "nucleo-do-movimento",
    num: "05",
    tipo: "comunidade",
    eyebrow: "Profissionais da saúde · WhatsApp",
    titulo: "Núcleo do Movimento",
    subtitulo: "Conhecimento compartilhado. Evolução coletiva.",
    descricao:
      "Grupo de estudos gratuito no WhatsApp para profissionais da saúde que querem evoluir juntos, trocar casos e estudar recuperação e performance de verdade.",
    cor: "#25d366",
    badge: "Gratuito",
    externo: true,
    url: "https://chat.whatsapp.com/InlgayKkt5JI1bquoBeZJZ",
    cta: "Entrar no grupo",
    destaques: [
      "Comunidade gratuita de profissionais da saúde",
      "Estudo de casos e troca de experiências",
      "Conteúdo de recuperação e performance",
    ],
  },
];

export function getPrograma(id: string): Programa | undefined {
  return programas.find((p) => p.id === id);
}

export function programaHref(p: Programa): string {
  return p.externo && p.url ? p.url : `/programa/${p.id}`;
}
