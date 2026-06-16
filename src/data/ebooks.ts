// E-books PER4MANCE — importados da pasta do Gustavo (Drive).
// PDFs gateados em /private/ebooks/<id>.pdf ; capas em /public/ebooks/capas/<id>.png.
// 'publico' separa quem aparece no bloco de Atletas x Profissionais na home.

export type Ebook = {
  id: string;
  titulo: string;
  publico: "atleta" | "treinador";
  categoria: "Recuperação" | "Performance" | "Mente";
  cor: string;
  arquivo: string;
  descricao: string;
};

export const ebooks: Ebook[] = [
  { id: "voltar-forte", titulo: "Voltar Mais Forte", publico: "atleta", categoria: "Recuperação", cor: "#b5e000", arquivo: "/ebooks/voltar-forte.pdf", descricao: "E-book PER4MANCE — Voltar Mais Forte." },
  { id: "sono-atleta", titulo: "O Atleta que Dorme, Ganha", publico: "atleta", categoria: "Recuperação", cor: "#1d6fe8", arquivo: "/ebooks/sono-atleta.pdf", descricao: "E-book PER4MANCE — O Atleta que Dorme, Ganha." },
  { id: "corpo-historia", titulo: "Seu Corpo Conta a Sua História", publico: "atleta", categoria: "Recuperação", cor: "#f26d40", arquivo: "/ebooks/corpo-historia.pdf", descricao: "E-book PER4MANCE — Seu Corpo Conta a Sua História." },
  { id: "fitness-40", titulo: "Fitness Após os 40", publico: "atleta", categoria: "Recuperação", cor: "#ef4444", arquivo: "/ebooks/fitness-40.pdf", descricao: "E-book PER4MANCE — Fitness Após os 40." },
  { id: "frio-quente", titulo: "Frio ou Quente?", publico: "atleta", categoria: "Recuperação", cor: "#00c8f0", arquivo: "/ebooks/frio-quente.pdf", descricao: "E-book PER4MANCE — Frio ou Quente?." },
  { id: "mental-2", titulo: "A Vantagem Mental do 2%", publico: "atleta", categoria: "Recuperação", cor: "#9333ea", arquivo: "/ebooks/mental-2.pdf", descricao: "E-book PER4MANCE — A Vantagem Mental do 2%." },
  { id: "estresse", titulo: "Estresse Vira Peso", publico: "atleta", categoria: "Recuperação", cor: "#ff2d87", arquivo: "/ebooks/estresse.pdf", descricao: "E-book PER4MANCE — Estresse Vira Peso." },
  { id: "aquecimento", titulo: "Aquecimento que Ninguém Faz Direito", publico: "atleta", categoria: "Recuperação", cor: "#38bdf8", arquivo: "/ebooks/aquecimento.pdf", descricao: "E-book PER4MANCE — Aquecimento que Ninguém Faz Direito." },
  { id: "velocidade", titulo: "Velocidade Não se Nasce, se Treina", publico: "atleta", categoria: "Recuperação", cor: "#22c55e", arquivo: "/ebooks/velocidade.pdf", descricao: "E-book PER4MANCE — Velocidade Não se Nasce, se Treina." },
  { id: "mobilidade", titulo: "Mobilidade: o Novo Alongamento", publico: "atleta", categoria: "Recuperação", cor: "#f5c518", arquivo: "/ebooks/mobilidade.pdf", descricao: "E-book PER4MANCE — Mobilidade: o Novo Alongamento." },
  { id: "numero", titulo: "O Número que Importa", publico: "atleta", categoria: "Recuperação", cor: "#b5e000", arquivo: "/ebooks/numero.pdf", descricao: "E-book PER4MANCE — O Número que Importa." },
  { id: "lesao-invisivel", titulo: "A Lesão que Você Não Vê", publico: "atleta", categoria: "Recuperação", cor: "#1d6fe8", arquivo: "/ebooks/lesao-invisivel.pdf", descricao: "E-book PER4MANCE — A Lesão que Você Não Vê." },
  { id: "dor-nao-parar", titulo: "Dor Não é Sinal de Parar", publico: "atleta", categoria: "Recuperação", cor: "#f26d40", arquivo: "/ebooks/dor-nao-parar.pdf", descricao: "E-book PER4MANCE — Dor Não é Sinal de Parar." },
  { id: "tornozelo", titulo: "O Tornozelo Esquecido", publico: "atleta", categoria: "Recuperação", cor: "#ef4444", arquivo: "/ebooks/tornozelo.pdf", descricao: "E-book PER4MANCE — O Tornozelo Esquecido." },
  { id: "proteina", titulo: "Proteína", publico: "atleta", categoria: "Recuperação", cor: "#00c8f0", arquivo: "/ebooks/proteina.pdf", descricao: "E-book PER4MANCE — Proteína." },
  { id: "treino-funcional", titulo: "Treinamento Funcional na Prática", publico: "atleta", categoria: "Recuperação", cor: "#9333ea", arquivo: "/ebooks/treino-funcional.pdf", descricao: "E-book PER4MANCE — Treinamento Funcional na Prática." },
  { id: "semana-descarga", titulo: "A Semana de Descarga", publico: "atleta", categoria: "Recuperação", cor: "#ff2d87", arquivo: "/ebooks/semana-descarga.pdf", descricao: "E-book PER4MANCE — A Semana de Descarga." },
  { id: "protocolo-recuperacao", titulo: "Protocolo de Recuperação Esportiva", publico: "atleta", categoria: "Recuperação", cor: "#38bdf8", arquivo: "/ebooks/protocolo-recuperacao.pdf", descricao: "E-book PER4MANCE — Protocolo de Recuperação Esportiva." },
  { id: "gestao-academia", titulo: "Gestão de Academia", publico: "treinador", categoria: "Performance", cor: "#22c55e", arquivo: "/ebooks/gestao-academia.pdf", descricao: "E-book PER4MANCE — Gestão de Academia." },
  { id: "marketing-personal", titulo: "Marketing para Personal Trainer", publico: "treinador", categoria: "Performance", cor: "#f5c518", arquivo: "/ebooks/marketing-personal.pdf", descricao: "E-book PER4MANCE — Marketing para Personal Trainer." },
  { id: "fisiologia", titulo: "Fisiologia do Exercício", publico: "treinador", categoria: "Performance", cor: "#b5e000", arquivo: "/ebooks/fisiologia.pdf", descricao: "E-book PER4MANCE — Fisiologia do Exercício." },
  { id: "prescricao", titulo: "Prescrição de Exercícios", publico: "treinador", categoria: "Performance", cor: "#1d6fe8", arquivo: "/ebooks/prescricao.pdf", descricao: "E-book PER4MANCE — Prescrição de Exercícios." },
  { id: "avaliacao-fisica", titulo: "Avaliação Física Completa", publico: "treinador", categoria: "Performance", cor: "#f26d40", arquivo: "/ebooks/avaliacao-fisica.pdf", descricao: "E-book PER4MANCE — Avaliação Física Completa." },
  { id: "biomecanica", titulo: "Biomecânica Aplicada", publico: "treinador", categoria: "Performance", cor: "#ef4444", arquivo: "/ebooks/biomecanica.pdf", descricao: "E-book PER4MANCE — Biomecânica Aplicada." },
  { id: "periodizacao", titulo: "Periodização do Treinamento", publico: "treinador", categoria: "Performance", cor: "#00c8f0", arquivo: "/ebooks/periodizacao.pdf", descricao: "E-book PER4MANCE — Periodização do Treinamento." },
  { id: "faturar-mais", titulo: "Faturar Mais", publico: "treinador", categoria: "Performance", cor: "#9333ea", arquivo: "/ebooks/faturar-mais.pdf", descricao: "E-book PER4MANCE — Faturar Mais." },
  { id: "avalie-antes", titulo: "Avalie Antes de Treinar", publico: "treinador", categoria: "Performance", cor: "#ff2d87", arquivo: "/ebooks/avalie-antes.pdf", descricao: "E-book PER4MANCE — Avalie Antes de Treinar." },
  { id: "personal-independente", titulo: "O Personal que Não Depende da Academia", publico: "treinador", categoria: "Performance", cor: "#38bdf8", arquivo: "/ebooks/personal-independente.pdf", descricao: "E-book PER4MANCE — O Personal que Não Depende da Academia." },
];

export function getEbook(id: string): Ebook | undefined {
  return ebooks.find((e) => e.id === id);
}
