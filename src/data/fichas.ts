// GERADO automaticamente de recuperacao-esportiva/producao-videos/FICHAS-6-EXERCICIOS.md
// Fonte de verdade do MÉTODO real do Gustavo (54 fichas: 9 protocolos × 6 fichas de 15 dias).
// Para regenerar: python tools/parse-fichas.py

export type Exercicio = { codigo: string; nome: string; prescricao: string; videoUrl?: string };
export type Ficha = {
  num: number;
  dias: string;
  fase: string;
  titulo: string;
  exercicios: Exercicio[];
};

export const FICHAS: Record<string, Ficha[]> = {
  "joelho": [
    {
      "num": 1,
      "dias": "1-15",
      "fase": "Fase 1",
      "titulo": "Ativação do VMO e Controle Articular",
      "exercicios": [
        {
          "codigo": "E-051",
          "nome": "Mobilização patelofemoral",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-050",
          "nome": "Contração de quadríceps (quad sets) + VMO",
          "prescricao": "5×10s → progredir até 3×30s"
        },
        {
          "codigo": "E-093",
          "nome": "Elevação de perna estendida",
          "prescricao": "3×15-20 controladas"
        },
        {
          "codigo": "E-094",
          "nome": "Extensão terminal de joelho com banda",
          "prescricao": "3×15-20 controladas"
        },
        {
          "codigo": "E-053",
          "nome": "Subida no step baixo",
          "prescricao": "3×15-20 controladas"
        },
        {
          "codigo": "E-009",
          "nome": "Ponte de glúteo",
          "prescricao": "3×15-20 controladas"
        }
      ]
    },
    {
      "num": 2,
      "dias": "16-30",
      "fase": "Fase 1",
      "titulo": "Propriocepção e Alinhamento do Joelho",
      "exercicios": [
        {
          "codigo": "E-036",
          "nome": "Equilíbrio unipodal",
          "prescricao": "3×30-45s cada perna"
        },
        {
          "codigo": "E-010",
          "nome": "Concha",
          "prescricao": "3×15-20"
        },
        {
          "codigo": "E-100",
          "nome": "Abdução de quadril em pé com banda",
          "prescricao": "3×15-20"
        },
        {
          "codigo": "E-095",
          "nome": "Agachamento espanhol",
          "prescricao": "3×8 (descida 3-5s)"
        },
        {
          "codigo": "E-094",
          "nome": "Extensão terminal de joelho com banda",
          "prescricao": "3×15-20"
        },
        {
          "codigo": "E-075",
          "nome": "Bicicleta ergométrica leve",
          "prescricao": "15-20min leve"
        }
      ]
    },
    {
      "num": 3,
      "dias": "31-45",
      "fase": "Fase 2",
      "titulo": "Força Excêntrica de Quadríceps",
      "exercicios": [
        {
          "codigo": "E-095",
          "nome": "Agachamento espanhol",
          "prescricao": "3-4×6-8 (descida 3-5s)"
        },
        {
          "codigo": "E-063",
          "nome": "Agachamento búlgaro",
          "prescricao": "3-4×6-8 (descida 3-5s)"
        },
        {
          "codigo": "E-057",
          "nome": "Cadeira extensora excêntrica",
          "prescricao": "3-4×6-8 (descida 3-5s)"
        },
        {
          "codigo": "E-059",
          "nome": "Afundo estático",
          "prescricao": "3×15 moderado"
        },
        {
          "codigo": "E-097",
          "nome": "Ponte de glúteo unilateral",
          "prescricao": "3×15-20 (ou +carga)"
        },
        {
          "codigo": "E-061",
          "nome": "Agachamento goblet",
          "prescricao": "3×15-20 (ou +carga)"
        }
      ]
    },
    {
      "num": 4,
      "dias": "46-60",
      "fase": "Fase 2",
      "titulo": "Fortalecimento Global do Membro Inferior",
      "exercicios": [
        {
          "codigo": "E-063",
          "nome": "Agachamento búlgaro",
          "prescricao": "4×8"
        },
        {
          "codigo": "E-015",
          "nome": "Nórdico completo",
          "prescricao": "4×6-8 (descida 3-5s, +carga)"
        },
        {
          "codigo": "E-057",
          "nome": "Cadeira extensora excêntrica",
          "prescricao": "4×6-8 (descida 3-5s, +carga)"
        },
        {
          "codigo": "E-073",
          "nome": "Elevação pélvica com carga",
          "prescricao": "4×8"
        },
        {
          "codigo": "E-054",
          "nome": "Descida do step excêntrica",
          "prescricao": "4×6-8 (descida 3-5s, +carga)"
        },
        {
          "codigo": "E-100",
          "nome": "Abdução de quadril em pé com banda",
          "prescricao": "3×12 com carga"
        }
      ]
    },
    {
      "num": 5,
      "dias": "61-75",
      "fase": "Fase 3",
      "titulo": "Retorno à Corrida e Agilidade",
      "exercicios": [
        {
          "codigo": "E-064",
          "nome": "Agachamento com barra",
          "prescricao": "4×6 pesado"
        },
        {
          "codigo": "E-053",
          "nome": "Subida no step baixo",
          "prescricao": "3×10 com carga"
        },
        {
          "codigo": "E-069",
          "nome": "Levantamento terra romeno",
          "prescricao": "4×6 pesado"
        },
        {
          "codigo": "E-097",
          "nome": "Ponte de glúteo unilateral",
          "prescricao": "3×10 com carga"
        },
        {
          "codigo": "E-076",
          "nome": "Caminhada do monstro com banda",
          "prescricao": "3×10 com carga"
        },
        {
          "codigo": "E-084",
          "nome": "Corrida linear progressiva 60-80-100%",
          "prescricao": "4-6×30-40m a 90-95%"
        }
      ]
    },
    {
      "num": 6,
      "dias": "76-90",
      "fase": "Fase 3",
      "titulo": "Pliometria e Retorno ao Esporte",
      "exercicios": [
        {
          "codigo": "E-078",
          "nome": "Saltos bilaterais com aterrissagem controlada",
          "prescricao": "4×4 (intensidade máxima)"
        },
        {
          "codigo": "E-080",
          "nome": "Salto a partir do agachamento",
          "prescricao": "4×4 (intensidade máxima)"
        },
        {
          "codigo": "E-063",
          "nome": "Agachamento búlgaro",
          "prescricao": "4×4-6 (carga alta)"
        },
        {
          "codigo": "E-015",
          "nome": "Nórdico completo",
          "prescricao": "3×6-8 (preventivo 2x/sem)"
        },
        {
          "codigo": "E-084",
          "nome": "Corrida linear progressiva 60-80-100%",
          "prescricao": "4-6×30m a 100% + drills"
        },
        {
          "codigo": "E-086",
          "nome": "Mudança de direção a 90° + drills",
          "prescricao": "4-6×30m a 100% + drills"
        }
      ]
    }
  ],
  "tornozelo": [
    {
      "num": 1,
      "dias": "1-15",
      "fase": "Fase 1",
      "titulo": "Mobilização Articular e Ativação dos Fibulares",
      "exercicios": [
        {
          "codigo": "E-023",
          "nome": "Mobilização de tornozelo (joelho à parede)",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-024",
          "nome": "Mobilização do calcâneo",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-101",
          "nome": "Alfabeto com o tornozelo",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-025",
          "nome": "Isométrico de inversão/eversão",
          "prescricao": "5×10s → progredir até 3×30s"
        },
        {
          "codigo": "E-026",
          "nome": "Tibial posterior com banda",
          "prescricao": "3×15-20 controladas"
        },
        {
          "codigo": "E-032",
          "nome": "Isométrico de flexão plantar",
          "prescricao": "5×10s → progredir até 3×30s"
        }
      ]
    },
    {
      "num": 2,
      "dias": "16-30",
      "fase": "Fase 1",
      "titulo": "Propriocepção e Intrínsecos do Pé",
      "exercicios": [
        {
          "codigo": "E-027",
          "nome": "Encolher toalha com os dedos",
          "prescricao": "3×15-20"
        },
        {
          "codigo": "E-102",
          "nome": "Elevação do antepé (tibial anterior)",
          "prescricao": "3×15-20"
        },
        {
          "codigo": "E-028",
          "nome": "Elevação de panturrilha bilateral",
          "prescricao": "3×15-20"
        },
        {
          "codigo": "E-035",
          "nome": "Prancha de equilíbrio bilateral",
          "prescricao": "3×15-20"
        },
        {
          "codigo": "E-036",
          "nome": "Equilíbrio unipodal",
          "prescricao": "3×30-45s cada perna"
        },
        {
          "codigo": "E-034",
          "nome": "Excêntrico de fibulares",
          "prescricao": "3×8 (descida 3-5s)"
        }
      ]
    },
    {
      "num": 3,
      "dias": "31-45",
      "fase": "Fase 2",
      "titulo": "Estabilidade Unipodal e Carga Excêntrica",
      "exercicios": [
        {
          "codigo": "E-036",
          "nome": "Equilíbrio unipodal",
          "prescricao": "3×45s cada perna"
        },
        {
          "codigo": "E-037",
          "nome": "Equilíbrio unipodal em superfície instável",
          "prescricao": "3×45s cada perna"
        },
        {
          "codigo": "E-103",
          "nome": "Equilíbrio com alcance em estrela (Y-balance)",
          "prescricao": "3×45s cada perna"
        },
        {
          "codigo": "E-029",
          "nome": "Elevação de panturrilha unilateral no degrau",
          "prescricao": "3×15-20 (ou +carga)"
        },
        {
          "codigo": "E-034",
          "nome": "Excêntrico de fibulares",
          "prescricao": "3-4×6-8 (descida 3-5s)"
        },
        {
          "codigo": "E-033",
          "nome": "Elevação de panturrilha com carga",
          "prescricao": "3×15-20 (ou +carga)"
        }
      ]
    },
    {
      "num": 4,
      "dias": "46-60",
      "fase": "Fase 2",
      "titulo": "Impacto Progressivo e Força Dinâmica",
      "exercicios": [
        {
          "codigo": "E-102",
          "nome": "Elevação do antepé (tibial anterior)",
          "prescricao": "3×12 com carga"
        },
        {
          "codigo": "E-103",
          "nome": "Equilíbrio com alcance em estrela (Y-balance)",
          "prescricao": "3×45s (com perturbação)"
        },
        {
          "codigo": "E-034",
          "nome": "Excêntrico de fibulares",
          "prescricao": "4×6-8 (descida 3-5s, +carga)"
        },
        {
          "codigo": "E-104",
          "nome": "Pular corda",
          "prescricao": "3×5 (baixo impacto)"
        },
        {
          "codigo": "E-078",
          "nome": "Saltos bilaterais com aterrissagem controlada",
          "prescricao": "3×5 (baixo impacto)"
        },
        {
          "codigo": "E-084",
          "nome": "Corrida linear progressiva 60-80-100%",
          "prescricao": "6×40m a 80% (recup. completa)"
        }
      ]
    },
    {
      "num": 5,
      "dias": "61-75",
      "fase": "Fase 3",
      "titulo": "Agilidade e Mudanças de Direção",
      "exercicios": [
        {
          "codigo": "E-083",
          "nome": "Escada de agilidade (padrão linear)",
          "prescricao": "4-6×30-40m a 90-95%"
        },
        {
          "codigo": "E-085",
          "nome": "Mudança de direção a 45°",
          "prescricao": "4-6×30-40m a 90-95%"
        },
        {
          "codigo": "E-037",
          "nome": "Equilíbrio unipodal em superfície instável",
          "prescricao": "3×30s (aquecimento)"
        },
        {
          "codigo": "E-081",
          "nome": "Saltos unilaterais (hops)",
          "prescricao": "4×5 (intensidade crescente)"
        },
        {
          "codigo": "E-079",
          "nome": "Salto na caixa",
          "prescricao": "4×5 (intensidade crescente)"
        },
        {
          "codigo": "E-084",
          "nome": "Corrida linear progressiva 60-80-100%",
          "prescricao": "4-6×30-40m a 90-95%"
        }
      ]
    },
    {
      "num": 6,
      "dias": "76-90",
      "fase": "Fase 3",
      "titulo": "Retorno ao Esporte e Prevenção",
      "exercicios": [
        {
          "codigo": "E-086",
          "nome": "Mudança de direção a 90° + drills",
          "prescricao": "4-6×30m a 100% + drills"
        },
        {
          "codigo": "E-083",
          "nome": "Escada de agilidade (padrão linear)",
          "prescricao": "4-6×30m a 100% + drills"
        },
        {
          "codigo": "E-081",
          "nome": "Saltos unilaterais (hops)",
          "prescricao": "4×4 (intensidade máxima)"
        },
        {
          "codigo": "E-078",
          "nome": "Saltos bilaterais com aterrissagem controlada",
          "prescricao": "4×4 (intensidade máxima)"
        },
        {
          "codigo": "E-037",
          "nome": "Equilíbrio unipodal em superfície instável",
          "prescricao": "3×30s (manutenção)"
        },
        {
          "codigo": "E-084",
          "nome": "Corrida linear progressiva 60-80-100%",
          "prescricao": "4-6×30m a 100% + drills"
        }
      ]
    }
  ],
  "lombar": [
    {
      "num": 1,
      "dias": "1-15",
      "fase": "Fase 1",
      "titulo": "Ativação do Core Profundo",
      "exercicios": [
        {
          "codigo": "E-002",
          "nome": "Respiração diafragmática",
          "prescricao": "3×15-20 controladas"
        },
        {
          "codigo": "E-001",
          "nome": "Ativação do transverso abdominal",
          "prescricao": "3×15-20 controladas"
        },
        {
          "codigo": "E-004",
          "nome": "Posição neutra da coluna",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-003",
          "nome": "Gato-camelo",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-109",
          "nome": "Rotação torácica deitado (livro aberto)",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-106",
          "nome": "Abdominal curl-up (McGill)",
          "prescricao": "3×15-20 controladas"
        }
      ]
    },
    {
      "num": 2,
      "dias": "16-30",
      "fase": "Fase 1",
      "titulo": "Estabilização Profunda da Coluna",
      "exercicios": [
        {
          "codigo": "E-005",
          "nome": "Inseto morto",
          "prescricao": "3×15-20"
        },
        {
          "codigo": "E-006",
          "nome": "Cão de caça",
          "prescricao": "3×15-20"
        },
        {
          "codigo": "E-007",
          "nome": "Prancha isométrica",
          "prescricao": "3×30-45s"
        },
        {
          "codigo": "E-008",
          "nome": "Prancha lateral",
          "prescricao": "3×30-45s"
        },
        {
          "codigo": "E-106",
          "nome": "Abdominal curl-up (McGill)",
          "prescricao": "3×15-20"
        },
        {
          "codigo": "E-009",
          "nome": "Ponte de glúteo",
          "prescricao": "3×15-20"
        }
      ]
    },
    {
      "num": 3,
      "dias": "31-45",
      "fase": "Fase 2",
      "titulo": "Glúteo como Protetor Lombar",
      "exercicios": [
        {
          "codigo": "E-009",
          "nome": "Ponte de glúteo",
          "prescricao": "3×15-20 (ou +carga)"
        },
        {
          "codigo": "E-097",
          "nome": "Ponte de glúteo unilateral",
          "prescricao": "3×15-20 (ou +carga)"
        },
        {
          "codigo": "E-067",
          "nome": "Bom-dia (peso corporal)",
          "prescricao": "3×15 moderado"
        },
        {
          "codigo": "E-061",
          "nome": "Agachamento goblet",
          "prescricao": "3×15-20 (ou +carga)"
        },
        {
          "codigo": "E-107",
          "nome": "Extensão de tronco controlada (superman)",
          "prescricao": "3×15-20 (ou +carga)"
        },
        {
          "codigo": "E-076",
          "nome": "Caminhada do monstro com banda",
          "prescricao": "3×15-20 (ou +carga)"
        }
      ]
    },
    {
      "num": 4,
      "dias": "46-60",
      "fase": "Fase 2",
      "titulo": "Carga Progressiva e Anti-Rotação",
      "exercicios": [
        {
          "codigo": "E-069",
          "nome": "Levantamento terra romeno",
          "prescricao": "4×8"
        },
        {
          "codigo": "E-073",
          "nome": "Elevação pélvica com carga",
          "prescricao": "4×8"
        },
        {
          "codigo": "E-117",
          "nome": "Pallof press overhead ajoelhado (anti-rotação)",
          "prescricao": "3×12 com carga"
        },
        {
          "codigo": "E-108",
          "nome": "Carregamento unilateral (suitcase carry)",
          "prescricao": "3×20-30m"
        },
        {
          "codigo": "E-008",
          "nome": "Prancha lateral",
          "prescricao": "3×45s"
        },
        {
          "codigo": "E-005",
          "nome": "Inseto morto",
          "prescricao": "3×12 com carga"
        }
      ]
    },
    {
      "num": 5,
      "dias": "61-75",
      "fase": "Fase 3",
      "titulo": "Força Funcional e Transferência",
      "exercicios": [
        {
          "codigo": "E-071",
          "nome": "Levantamento terra convencional",
          "prescricao": "4×6 pesado"
        },
        {
          "codigo": "E-065",
          "nome": "Agachamento frontal",
          "prescricao": "4×6 pesado"
        },
        {
          "codigo": "E-077",
          "nome": "Caminhada do fazendeiro",
          "prescricao": "3×30m pesado"
        },
        {
          "codigo": "E-108",
          "nome": "Carregamento unilateral (suitcase carry)",
          "prescricao": "3×30m pesado"
        },
        {
          "codigo": "E-073",
          "nome": "Elevação pélvica com carga",
          "prescricao": "4×6 pesado"
        },
        {
          "codigo": "E-118",
          "nome": "Lifting (diagonal baixo→alto no cabo)",
          "prescricao": "3×10 com carga"
        }
      ]
    },
    {
      "num": 6,
      "dias": "76-90",
      "fase": "Fase 3",
      "titulo": "Carga Máxima e Retorno ao Esporte",
      "exercicios": [
        {
          "codigo": "E-071",
          "nome": "Levantamento terra convencional",
          "prescricao": "4×4-6 (carga alta)"
        },
        {
          "codigo": "E-064",
          "nome": "Agachamento com barra",
          "prescricao": "4×4-6 (carga alta)"
        },
        {
          "codigo": "E-074",
          "nome": "Elevação pélvica explosiva",
          "prescricao": "4×4 (intensidade máxima)"
        },
        {
          "codigo": "E-077",
          "nome": "Caminhada do fazendeiro",
          "prescricao": "3×30m pesado"
        },
        {
          "codigo": "E-007",
          "nome": "Prancha isométrica",
          "prescricao": "2×30s (manutenção)"
        },
        {
          "codigo": "E-084",
          "nome": "Corrida linear progressiva 60-80-100%",
          "prescricao": "4-6×30m a 100% + drills"
        }
      ]
    }
  ],
  "posterior": [
    {
      "num": 1,
      "dias": "1-15",
      "fase": "Fase 1",
      "titulo": "Mobilização Neural e Isométrico Inicial",
      "exercicios": [
        {
          "codigo": "E-018",
          "nome": "Mobilização neural do ciático",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-099",
          "nome": "Alongamento ativo de isquiotibiais com banda",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-019",
          "nome": "Isométrico de isquiotibiais",
          "prescricao": "5×10s → progredir até 3×30s"
        },
        {
          "codigo": "E-009",
          "nome": "Ponte de glúteo",
          "prescricao": "3×15-20 controladas"
        },
        {
          "codigo": "E-003",
          "nome": "Gato-camelo",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-075",
          "nome": "Bicicleta ergométrica leve",
          "prescricao": "10-15min leve"
        }
      ]
    },
    {
      "num": 2,
      "dias": "16-30",
      "fase": "Fase 1",
      "titulo": "Força Excêntrica Leve e Ativação de Glúteo",
      "exercicios": [
        {
          "codigo": "E-099",
          "nome": "Alongamento ativo de isquiotibiais com banda",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-058",
          "nome": "Mesa flexora excêntrica leve",
          "prescricao": "3×8 (descida 3-5s)"
        },
        {
          "codigo": "E-098",
          "nome": "Flexão de isquiotibiais com deslizamento",
          "prescricao": "3×8 (descida 3-5s)"
        },
        {
          "codigo": "E-009",
          "nome": "Ponte de glúteo",
          "prescricao": "3×15-20"
        },
        {
          "codigo": "E-097",
          "nome": "Ponte de glúteo unilateral",
          "prescricao": "3×15-20"
        },
        {
          "codigo": "E-076",
          "nome": "Caminhada do monstro com banda",
          "prescricao": "3×15-20"
        }
      ]
    },
    {
      "num": 3,
      "dias": "31-45",
      "fase": "Fase 2",
      "titulo": "Nordic Curl Modificado e Corrida a 60%",
      "exercicios": [
        {
          "codigo": "E-014",
          "nome": "Nórdico modificado (com banda)",
          "prescricao": "3-4×6-8 (descida 3-5s)"
        },
        {
          "codigo": "E-070",
          "nome": "Terra romeno unilateral",
          "prescricao": "3×15 moderado"
        },
        {
          "codigo": "E-098",
          "nome": "Flexão de isquiotibiais com deslizamento",
          "prescricao": "3-4×6-8 (descida 3-5s)"
        },
        {
          "codigo": "E-097",
          "nome": "Ponte de glúteo unilateral",
          "prescricao": "3×15-20 (ou +carga)"
        },
        {
          "codigo": "E-073",
          "nome": "Elevação pélvica com carga",
          "prescricao": "3×15 moderado"
        },
        {
          "codigo": "E-084",
          "nome": "Corrida linear progressiva 60-80-100%",
          "prescricao": "6×40m a 60% (recup. completa)"
        }
      ]
    },
    {
      "num": 4,
      "dias": "46-60",
      "fase": "Fase 2",
      "titulo": "Nordic Curl Completo e Corrida a 80%",
      "exercicios": [
        {
          "codigo": "E-015",
          "nome": "Nórdico completo",
          "prescricao": "4×6-8 (descida 3-5s, +carga)"
        },
        {
          "codigo": "E-069",
          "nome": "Levantamento terra romeno",
          "prescricao": "4×8"
        },
        {
          "codigo": "E-098",
          "nome": "Flexão de isquiotibiais com deslizamento",
          "prescricao": "4×6-8 (descida 3-5s, +carga)"
        },
        {
          "codigo": "E-073",
          "nome": "Elevação pélvica com carga",
          "prescricao": "4×8"
        },
        {
          "codigo": "E-082",
          "nome": "Skipping progressivo",
          "prescricao": "3×5 (baixo impacto)"
        },
        {
          "codigo": "E-084",
          "nome": "Corrida linear progressiva 60-80-100%",
          "prescricao": "6×40m a 80% (recup. completa)"
        }
      ]
    },
    {
      "num": 5,
      "dias": "61-75",
      "fase": "Fase 3",
      "titulo": "Velocidade Máxima e Potência de Quadril",
      "exercicios": [
        {
          "codigo": "E-015",
          "nome": "Nórdico completo",
          "prescricao": "3×6 (carga alta)"
        },
        {
          "codigo": "E-119",
          "nome": "Elevação pélvica unilateral no banco",
          "prescricao": "4×8 (cada perna)"
        },
        {
          "codigo": "E-074",
          "nome": "Elevação pélvica explosiva",
          "prescricao": "4×5 (intensidade crescente)"
        },
        {
          "codigo": "E-082",
          "nome": "Skipping progressivo",
          "prescricao": "4×5 (intensidade crescente)"
        },
        {
          "codigo": "E-086",
          "nome": "Mudança de direção a 90° + drills",
          "prescricao": "4-6×30-40m a 90-95%"
        },
        {
          "codigo": "E-084",
          "nome": "Corrida linear progressiva 60-80-100%",
          "prescricao": "4-6×30-40m a 90-95%"
        }
      ]
    },
    {
      "num": 6,
      "dias": "76-90",
      "fase": "Fase 3",
      "titulo": "Sprint Máximo e Prevenção Permanente",
      "exercicios": [
        {
          "codigo": "E-015",
          "nome": "Nórdico completo",
          "prescricao": "3×6-8 (preventivo 2x/sem)"
        },
        {
          "codigo": "E-069",
          "nome": "Levantamento terra romeno",
          "prescricao": "4×4-6 (carga alta)"
        },
        {
          "codigo": "E-074",
          "nome": "Elevação pélvica explosiva",
          "prescricao": "4×4 (intensidade máxima)"
        },
        {
          "codigo": "E-081",
          "nome": "Saltos unilaterais (hops)",
          "prescricao": "4×4 (intensidade máxima)"
        },
        {
          "codigo": "E-086",
          "nome": "Mudança de direção a 90° + drills",
          "prescricao": "4-6×30m a 100% + drills"
        },
        {
          "codigo": "E-084",
          "nome": "Corrida linear progressiva 60-80-100%",
          "prescricao": "4-6×30m a 100% + drills"
        }
      ]
    }
  ],
  "pubalgia": [
    {
      "num": 1,
      "dias": "1-15",
      "fase": "Fase 1",
      "titulo": "Isométrico de Adutores e Core Profundo",
      "exercicios": [
        {
          "codigo": "E-013",
          "nome": "Isométrico de adutores com bola",
          "prescricao": "5×10s → progredir até 3×30s"
        },
        {
          "codigo": "E-001",
          "nome": "Ativação do transverso abdominal",
          "prescricao": "3×15-20 controladas"
        },
        {
          "codigo": "E-002",
          "nome": "Respiração diafragmática",
          "prescricao": "3×15-20 controladas"
        },
        {
          "codigo": "E-110",
          "nome": "Mobilização de adutores (rock back)",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-009",
          "nome": "Ponte de glúteo",
          "prescricao": "3×15-20 controladas"
        },
        {
          "codigo": "E-005",
          "nome": "Inseto morto",
          "prescricao": "3×15-20 controladas"
        }
      ]
    },
    {
      "num": 2,
      "dias": "16-30",
      "fase": "Fase 1",
      "titulo": "Adução Lateral e Anti-Rotação de Core",
      "exercicios": [
        {
          "codigo": "E-012",
          "nome": "Adução deitado de lado",
          "prescricao": "3×15-20"
        },
        {
          "codigo": "E-008",
          "nome": "Prancha lateral",
          "prescricao": "3×30-45s"
        },
        {
          "codigo": "E-110",
          "nome": "Mobilização de adutores (rock back)",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-111",
          "nome": "Marcha de psoas com miniband",
          "prescricao": "3×15-20"
        },
        {
          "codigo": "E-013",
          "nome": "Isométrico de adutores com bola",
          "prescricao": "3×30-45s"
        },
        {
          "codigo": "E-006",
          "nome": "Cão de caça",
          "prescricao": "3×15-20"
        }
      ]
    },
    {
      "num": 3,
      "dias": "31-45",
      "fase": "Fase 2",
      "titulo": "Progressão de Adutores e Estabilidade",
      "exercicios": [
        {
          "codigo": "E-049",
          "nome": "Adução de quadril em pé com banda",
          "prescricao": "3×15-20 (ou +carga)"
        },
        {
          "codigo": "E-048",
          "nome": "Pressão de Pallof",
          "prescricao": "3×15-20 (ou +carga)"
        },
        {
          "codigo": "E-111",
          "nome": "Marcha de psoas com miniband",
          "prescricao": "3×15-20 (ou +carga)"
        },
        {
          "codigo": "E-062",
          "nome": "Agachamento livre (peso corporal) com descida controlada",
          "prescricao": "3×15-20 (ou +carga)"
        },
        {
          "codigo": "E-013",
          "nome": "Isométrico de adutores com bola",
          "prescricao": "3×45s"
        },
        {
          "codigo": "E-075",
          "nome": "Bicicleta ergométrica leve",
          "prescricao": "15-20min moderado"
        }
      ]
    },
    {
      "num": 4,
      "dias": "46-60",
      "fase": "Fase 2",
      "titulo": "Copenhagen e Corrida Progressiva",
      "exercicios": [
        {
          "codigo": "E-016",
          "nome": "Prancha Copenhagen modificada",
          "prescricao": "3×45s"
        },
        {
          "codigo": "E-066",
          "nome": "Agachamento lateral",
          "prescricao": "3×12 com carga"
        },
        {
          "codigo": "E-108",
          "nome": "Carregamento unilateral (suitcase carry)",
          "prescricao": "3×20-30m"
        },
        {
          "codigo": "E-049",
          "nome": "Adução de quadril em pé com banda",
          "prescricao": "3×12 com carga"
        },
        {
          "codigo": "E-073",
          "nome": "Elevação pélvica com carga",
          "prescricao": "4×8"
        },
        {
          "codigo": "E-084",
          "nome": "Corrida linear progressiva 60-80-100%",
          "prescricao": "6×40m a 80% (recup. completa)"
        }
      ]
    },
    {
      "num": 5,
      "dias": "61-75",
      "fase": "Fase 3",
      "titulo": "Copenhagen Completo e Gestos do Esporte",
      "exercicios": [
        {
          "codigo": "E-017",
          "nome": "Prancha Copenhagen completa",
          "prescricao": "2×30s (aquecimento)"
        },
        {
          "codigo": "E-066",
          "nome": "Agachamento lateral",
          "prescricao": "3×10 com carga"
        },
        {
          "codigo": "E-048",
          "nome": "Pressão de Pallof",
          "prescricao": "3×10 com carga"
        },
        {
          "codigo": "E-085",
          "nome": "Mudança de direção a 45°",
          "prescricao": "4-6×30-40m a 90-95%"
        },
        {
          "codigo": "E-088",
          "nome": "Chute progressivo",
          "prescricao": "4-6×30-40m a 90-95%"
        },
        {
          "codigo": "E-084",
          "nome": "Corrida linear progressiva 60-80-100%",
          "prescricao": "4-6×30-40m a 90-95%"
        }
      ]
    },
    {
      "num": 6,
      "dias": "76-90",
      "fase": "Fase 3",
      "titulo": "Retorno Completo ao Jogo",
      "exercicios": [
        {
          "codigo": "E-017",
          "nome": "Prancha Copenhagen completa",
          "prescricao": "2×30s (manutenção)"
        },
        {
          "codigo": "E-049",
          "nome": "Adução de quadril em pé com banda",
          "prescricao": "3×10 (manutenção 2x/sem)"
        },
        {
          "codigo": "E-074",
          "nome": "Elevação pélvica explosiva",
          "prescricao": "4×4 (intensidade máxima)"
        },
        {
          "codigo": "E-086",
          "nome": "Mudança de direção a 90° + drills",
          "prescricao": "4-6×30m a 100% + drills"
        },
        {
          "codigo": "E-088",
          "nome": "Chute progressivo",
          "prescricao": "4-6×30m a 100% + drills"
        },
        {
          "codigo": "E-084",
          "nome": "Corrida linear progressiva 60-80-100%",
          "prescricao": "4-6×30m a 100% + drills"
        }
      ]
    }
  ],
  "panturrilha": [
    {
      "num": 1,
      "dias": "1-15",
      "fase": "Fase 1",
      "titulo": "Repouso Relativo e Isométrico Inicial",
      "exercicios": [
        {
          "codigo": "E-032",
          "nome": "Isométrico de flexão plantar",
          "prescricao": "5×10s → progredir até 3×30s"
        },
        {
          "codigo": "E-023",
          "nome": "Mobilização de tornozelo (joelho à parede)",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-024",
          "nome": "Mobilização do calcâneo",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-101",
          "nome": "Alfabeto com o tornozelo",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-028",
          "nome": "Elevação de panturrilha bilateral",
          "prescricao": "3×15-20 controladas"
        },
        {
          "codigo": "E-075",
          "nome": "Bicicleta ergométrica leve",
          "prescricao": "10-15min leve"
        }
      ]
    },
    {
      "num": 2,
      "dias": "16-30",
      "fase": "Fase 1",
      "titulo": "Excêntrico do Gastrocnêmio e Sóleo",
      "exercicios": [
        {
          "codigo": "E-030",
          "nome": "Excêntrico de panturrilha joelho estendido (Alfredson)",
          "prescricao": "3×8 (descida 3-5s)"
        },
        {
          "codigo": "E-031",
          "nome": "Excêntrico de panturrilha joelho fletido (Alfredson)",
          "prescricao": "3×8 (descida 3-5s)"
        },
        {
          "codigo": "E-028",
          "nome": "Elevação de panturrilha bilateral",
          "prescricao": "3×15-20"
        },
        {
          "codigo": "E-102",
          "nome": "Elevação do antepé (tibial anterior)",
          "prescricao": "3×15-20"
        },
        {
          "codigo": "E-036",
          "nome": "Equilíbrio unipodal",
          "prescricao": "3×30-45s cada perna"
        },
        {
          "codigo": "E-029",
          "nome": "Elevação de panturrilha unilateral no degrau",
          "prescricao": "3×15-20"
        }
      ]
    },
    {
      "num": 3,
      "dias": "31-45",
      "fase": "Fase 2",
      "titulo": "Calf Raise Progressivo e Jogging Leve",
      "exercicios": [
        {
          "codigo": "E-029",
          "nome": "Elevação de panturrilha unilateral no degrau",
          "prescricao": "3×15-20 (ou +carga)"
        },
        {
          "codigo": "E-033",
          "nome": "Elevação de panturrilha com carga",
          "prescricao": "3×15-20 (ou +carga)"
        },
        {
          "codigo": "E-105",
          "nome": "Panturrilha sentado com carga",
          "prescricao": "3×15-20 (ou +carga)"
        },
        {
          "codigo": "E-030",
          "nome": "Excêntrico de panturrilha joelho estendido (Alfredson)",
          "prescricao": "3-4×6-8 (descida 3-5s)"
        },
        {
          "codigo": "E-036",
          "nome": "Equilíbrio unipodal",
          "prescricao": "3×45s cada perna"
        },
        {
          "codigo": "E-084",
          "nome": "Corrida linear progressiva 60-80-100%",
          "prescricao": "6×40m a 60% (recup. completa)"
        }
      ]
    },
    {
      "num": 4,
      "dias": "46-60",
      "fase": "Fase 2",
      "titulo": "Força com Carga e Corrida Progressiva",
      "exercicios": [
        {
          "codigo": "E-033",
          "nome": "Elevação de panturrilha com carga",
          "prescricao": "3×12 com carga"
        },
        {
          "codigo": "E-105",
          "nome": "Panturrilha sentado com carga",
          "prescricao": "3×12 com carga"
        },
        {
          "codigo": "E-031",
          "nome": "Excêntrico de panturrilha joelho fletido (Alfredson)",
          "prescricao": "4×6-8 (descida 3-5s, +carga)"
        },
        {
          "codigo": "E-104",
          "nome": "Pular corda",
          "prescricao": "3×5 (baixo impacto)"
        },
        {
          "codigo": "E-078",
          "nome": "Saltos bilaterais com aterrissagem controlada",
          "prescricao": "3×5 (baixo impacto)"
        },
        {
          "codigo": "E-084",
          "nome": "Corrida linear progressiva 60-80-100%",
          "prescricao": "6×40m a 80% (recup. completa)"
        }
      ]
    },
    {
      "num": 5,
      "dias": "61-75",
      "fase": "Fase 3",
      "titulo": "Pliometria e Velocidade",
      "exercicios": [
        {
          "codigo": "E-079",
          "nome": "Salto na caixa",
          "prescricao": "4×5 (intensidade crescente)"
        },
        {
          "codigo": "E-082",
          "nome": "Skipping progressivo",
          "prescricao": "4×5 (intensidade crescente)"
        },
        {
          "codigo": "E-104",
          "nome": "Pular corda",
          "prescricao": "4×5 (intensidade crescente)"
        },
        {
          "codigo": "E-085",
          "nome": "Mudança de direção a 45°",
          "prescricao": "4-6×30-40m a 90-95%"
        },
        {
          "codigo": "E-033",
          "nome": "Elevação de panturrilha com carga",
          "prescricao": "3×10 com carga"
        },
        {
          "codigo": "E-084",
          "nome": "Corrida linear progressiva 60-80-100%",
          "prescricao": "4-6×30-40m a 90-95%"
        }
      ]
    },
    {
      "num": 6,
      "dias": "76-90",
      "fase": "Fase 3",
      "titulo": "Sprints e Manutenção Permanente",
      "exercicios": [
        {
          "codigo": "E-030",
          "nome": "Excêntrico de panturrilha joelho estendido (Alfredson)",
          "prescricao": "3×6-8 (preventivo 2x/sem)"
        },
        {
          "codigo": "E-029",
          "nome": "Elevação de panturrilha unilateral no degrau",
          "prescricao": "3×10 (manutenção 2x/sem)"
        },
        {
          "codigo": "E-081",
          "nome": "Saltos unilaterais (hops)",
          "prescricao": "4×4 (intensidade máxima)"
        },
        {
          "codigo": "E-079",
          "nome": "Salto na caixa",
          "prescricao": "4×4 (intensidade máxima)"
        },
        {
          "codigo": "E-086",
          "nome": "Mudança de direção a 90° + drills",
          "prescricao": "4-6×30m a 100% + drills"
        },
        {
          "codigo": "E-084",
          "nome": "Corrida linear progressiva 60-80-100%",
          "prescricao": "4-6×30m a 100% + drills"
        }
      ]
    }
  ],
  "quadril": [
    {
      "num": 1,
      "dias": "1-15",
      "fase": "Fase 1",
      "titulo": "Mobilização Capsular e Dissociação Pélvica",
      "exercicios": [
        {
          "codigo": "E-020",
          "nome": "Mobilidade 90/90 de quadril",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-039",
          "nome": "Tração de quadril com banda",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-110",
          "nome": "Mobilização de adutores (rock back)",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-022",
          "nome": "Alongamento de iliopsoas (afundo)",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-010",
          "nome": "Concha",
          "prescricao": "3×15-20 controladas"
        },
        {
          "codigo": "E-011",
          "nome": "Abdução de quadril deitado",
          "prescricao": "3×15-20 controladas"
        }
      ]
    },
    {
      "num": 2,
      "dias": "16-30",
      "fase": "Fase 1",
      "titulo": "Rotação Interna e Flexor de Quadril",
      "exercicios": [
        {
          "codigo": "E-021",
          "nome": "Mobilização de rotação interna do quadril",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-022",
          "nome": "Alongamento de iliopsoas (afundo)",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-111",
          "nome": "Marcha de psoas com miniband",
          "prescricao": "3×15-20"
        },
        {
          "codigo": "E-010",
          "nome": "Concha",
          "prescricao": "3×15-20"
        },
        {
          "codigo": "E-011",
          "nome": "Abdução de quadril deitado",
          "prescricao": "3×15-20"
        },
        {
          "codigo": "E-100",
          "nome": "Abdução de quadril em pé com banda",
          "prescricao": "3×15-20"
        }
      ]
    },
    {
      "num": 3,
      "dias": "31-45",
      "fase": "Fase 2",
      "titulo": "Força em Amplitude Completa",
      "exercicios": [
        {
          "codigo": "E-020",
          "nome": "Mobilidade 90/90 de quadril",
          "prescricao": "2×10 (aquecimento)"
        },
        {
          "codigo": "E-068",
          "nome": "Hip hinge com bastão",
          "prescricao": "2×10 (aquecimento)"
        },
        {
          "codigo": "E-062",
          "nome": "Agachamento livre (peso corporal) com descida controlada",
          "prescricao": "3×15-20 (ou +carga)"
        },
        {
          "codigo": "E-076",
          "nome": "Caminhada do monstro com banda",
          "prescricao": "3×15-20 (ou +carga)"
        },
        {
          "codigo": "E-097",
          "nome": "Ponte de glúteo unilateral",
          "prescricao": "3×15-20 (ou +carga)"
        },
        {
          "codigo": "E-066",
          "nome": "Agachamento lateral",
          "prescricao": "3×15-20 (ou +carga)"
        }
      ]
    },
    {
      "num": 4,
      "dias": "46-60",
      "fase": "Fase 2",
      "titulo": "Carga Progressiva e Corrida Inicial",
      "exercicios": [
        {
          "codigo": "E-021",
          "nome": "Mobilização de rotação interna do quadril",
          "prescricao": "2×10 (aquecimento)"
        },
        {
          "codigo": "E-072",
          "nome": "Levantamento terra sumô",
          "prescricao": "4×8"
        },
        {
          "codigo": "E-063",
          "nome": "Agachamento búlgaro",
          "prescricao": "4×8"
        },
        {
          "codigo": "E-100",
          "nome": "Abdução de quadril em pé com banda",
          "prescricao": "3×12 com carga"
        },
        {
          "codigo": "E-073",
          "nome": "Elevação pélvica com carga",
          "prescricao": "4×8"
        },
        {
          "codigo": "E-084",
          "nome": "Corrida linear progressiva 60-80-100%",
          "prescricao": "6×40m a 80% (recup. completa)"
        }
      ]
    },
    {
      "num": 5,
      "dias": "61-75",
      "fase": "Fase 3",
      "titulo": "Movimentos Integrados e Agilidade",
      "exercicios": [
        {
          "codigo": "E-112",
          "nome": "Avião de quadril",
          "prescricao": "3×10 com carga"
        },
        {
          "codigo": "E-064",
          "nome": "Agachamento com barra",
          "prescricao": "4×6 pesado"
        },
        {
          "codigo": "E-076",
          "nome": "Caminhada do monstro com banda",
          "prescricao": "3×10 com carga"
        },
        {
          "codigo": "E-020",
          "nome": "Mobilidade 90/90 de quadril",
          "prescricao": "2×8 (aquecimento)"
        },
        {
          "codigo": "E-085",
          "nome": "Mudança de direção a 45°",
          "prescricao": "4-6×30-40m a 90-95%"
        },
        {
          "codigo": "E-086",
          "nome": "Mudança de direção a 90° + drills",
          "prescricao": "4-6×30-40m a 90-95%"
        }
      ]
    },
    {
      "num": 6,
      "dias": "76-90",
      "fase": "Fase 3",
      "titulo": "Carga Máxima e Mobilidade Permanente",
      "exercicios": [
        {
          "codigo": "E-020",
          "nome": "Mobilidade 90/90 de quadril",
          "prescricao": "2×8 (rotina diária)"
        },
        {
          "codigo": "E-112",
          "nome": "Avião de quadril",
          "prescricao": "3×10 (manutenção 2x/sem)"
        },
        {
          "codigo": "E-064",
          "nome": "Agachamento com barra",
          "prescricao": "4×4-6 (carga alta)"
        },
        {
          "codigo": "E-071",
          "nome": "Levantamento terra convencional",
          "prescricao": "4×4-6 (carga alta)"
        },
        {
          "codigo": "E-080",
          "nome": "Salto a partir do agachamento",
          "prescricao": "4×4 (intensidade máxima)"
        },
        {
          "codigo": "E-078",
          "nome": "Saltos bilaterais com aterrissagem controlada",
          "prescricao": "4×4 (intensidade máxima)"
        }
      ]
    }
  ],
  "ombro": [
    {
      "num": 1,
      "dias": "1-15",
      "fase": "Fase 1",
      "titulo": "Mobilização Capsular e Descompressão",
      "exercicios": [
        {
          "codigo": "E-038",
          "nome": "Pêndulo de ombro",
          "prescricao": "3×30s cada perna"
        },
        {
          "codigo": "E-040",
          "nome": "Alongamento do dorminhoco",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-114",
          "nome": "Alongamento posterior do ombro (cruzado)",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-109",
          "nome": "Rotação torácica deitado (livro aberto)",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-113",
          "nome": "Deslizamento escapular na parede",
          "prescricao": "3×15-20 controladas"
        },
        {
          "codigo": "E-041",
          "nome": "Isométrico de rotadores externos",
          "prescricao": "5×10s → progredir até 3×30s"
        }
      ]
    },
    {
      "num": 2,
      "dias": "16-30",
      "fase": "Fase 1",
      "titulo": "Manguito Rotador e Estabilidade Escapular",
      "exercicios": [
        {
          "codigo": "E-042",
          "nome": "Rotação externa com banda",
          "prescricao": "3×15-20"
        },
        {
          "codigo": "E-043",
          "nome": "Flexão na parede com protração",
          "prescricao": "3×15-20"
        },
        {
          "codigo": "E-044",
          "nome": "Retração escapular Y-T com banda",
          "prescricao": "3×15-20"
        },
        {
          "codigo": "E-113",
          "nome": "Deslizamento escapular na parede",
          "prescricao": "3×15-20"
        },
        {
          "codigo": "E-041",
          "nome": "Isométrico de rotadores externos",
          "prescricao": "3×30-45s"
        },
        {
          "codigo": "E-114",
          "nome": "Alongamento posterior do ombro (cruzado)",
          "prescricao": "2×10 reps lentas (cada lado)"
        }
      ]
    },
    {
      "num": 3,
      "dias": "31-45",
      "fase": "Fase 2",
      "titulo": "Força de Rotadores e Cadeia Posterior",
      "exercicios": [
        {
          "codigo": "E-042",
          "nome": "Rotação externa com banda",
          "prescricao": "3×15-20 (ou +carga)"
        },
        {
          "codigo": "E-046",
          "nome": "Elevação lateral até 90°",
          "prescricao": "3×15-20 (ou +carga)"
        },
        {
          "codigo": "E-045",
          "nome": "Puxada na face",
          "prescricao": "3×15-20 (ou +carga)"
        },
        {
          "codigo": "E-047",
          "nome": "Remada unilateral com halter",
          "prescricao": "3×15-20 (ou +carga)"
        },
        {
          "codigo": "E-044",
          "nome": "Retração escapular Y-T com banda",
          "prescricao": "3×15-20 (ou +carga)"
        },
        {
          "codigo": "E-116",
          "nome": "Flexão de braço com protração (push-up plus)",
          "prescricao": "3×15-20 (ou +carga)"
        }
      ]
    },
    {
      "num": 4,
      "dias": "46-60",
      "fase": "Fase 2",
      "titulo": "Amplitude Total e Carga Excêntrica",
      "exercicios": [
        {
          "codigo": "E-089",
          "nome": "Press horizontal com halteres (excêntrico)",
          "prescricao": "4×6-8 (descida 3-5s, +carga)"
        },
        {
          "codigo": "E-090",
          "nome": "Press inclinado leve (acima de 90°)",
          "prescricao": "4×8"
        },
        {
          "codigo": "E-115",
          "nome": "Rotação externa a 90° de abdução com banda",
          "prescricao": "3×12 com carga"
        },
        {
          "codigo": "E-045",
          "nome": "Puxada na face",
          "prescricao": "3×12 com carga"
        },
        {
          "codigo": "E-116",
          "nome": "Flexão de braço com protração (push-up plus)",
          "prescricao": "3×12 com carga"
        },
        {
          "codigo": "E-047",
          "nome": "Remada unilateral com halter",
          "prescricao": "3×12 com carga"
        }
      ]
    },
    {
      "num": 5,
      "dias": "61-75",
      "fase": "Fase 3",
      "titulo": "Movimentos do Esporte e Supino Progressivo",
      "exercicios": [
        {
          "codigo": "E-091",
          "nome": "Supino reto progressivo",
          "prescricao": "4×6 pesado"
        },
        {
          "codigo": "E-092",
          "nome": "Press unilateral com halter",
          "prescricao": "4×6 pesado"
        },
        {
          "codigo": "E-115",
          "nome": "Rotação externa a 90° de abdução com banda",
          "prescricao": "3×10 com carga"
        },
        {
          "codigo": "E-087",
          "nome": "Arremesso progressivo (ombro)",
          "prescricao": "4-6×30-40m a 90-95%"
        },
        {
          "codigo": "E-045",
          "nome": "Puxada na face",
          "prescricao": "3×10 com carga"
        },
        {
          "codigo": "E-046",
          "nome": "Elevação lateral até 90°",
          "prescricao": "3×10 com carga"
        }
      ]
    },
    {
      "num": 6,
      "dias": "76-90",
      "fase": "Fase 3",
      "titulo": "Carga Máxima e Manutenção Permanente",
      "exercicios": [
        {
          "codigo": "E-091",
          "nome": "Supino reto progressivo",
          "prescricao": "4×4-6 (carga alta)"
        },
        {
          "codigo": "E-087",
          "nome": "Arremesso progressivo (ombro)",
          "prescricao": "4-6×30m a 100% + drills"
        },
        {
          "codigo": "E-042",
          "nome": "Rotação externa com banda",
          "prescricao": "3×10 (manutenção 2x/sem)"
        },
        {
          "codigo": "E-115",
          "nome": "Rotação externa a 90° de abdução com banda",
          "prescricao": "3×10 (manutenção 2x/sem)"
        },
        {
          "codigo": "E-092",
          "nome": "Press unilateral com halter",
          "prescricao": "4×4-6 (carga alta)"
        },
        {
          "codigo": "E-045",
          "nome": "Puxada na face",
          "prescricao": "3×10 (manutenção 2x/sem)"
        }
      ]
    }
  ],
  "quadriceps": [
    {
      "num": 1,
      "dias": "1-15",
      "fase": "Fase 1",
      "titulo": "Ativação do VMO e Controle Inicial",
      "exercicios": [
        {
          "codigo": "E-051",
          "nome": "Mobilização patelofemoral",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-050",
          "nome": "Contração de quadríceps (quad sets) + VMO",
          "prescricao": "5×10s → progredir até 3×30s"
        },
        {
          "codigo": "E-093",
          "nome": "Elevação de perna estendida",
          "prescricao": "3×15-20 controladas"
        },
        {
          "codigo": "E-094",
          "nome": "Extensão terminal de joelho com banda",
          "prescricao": "3×15-20 controladas"
        },
        {
          "codigo": "E-052",
          "nome": "Agachamento isométrico na parede",
          "prescricao": "5×10s → progredir até 3×30s"
        },
        {
          "codigo": "E-009",
          "nome": "Ponte de glúteo",
          "prescricao": "3×15-20 controladas"
        }
      ]
    },
    {
      "num": 2,
      "dias": "16-30",
      "fase": "Fase 1",
      "titulo": "Excêntrico e Mobilidade Articular",
      "exercicios": [
        {
          "codigo": "E-023",
          "nome": "Mobilização de tornozelo (joelho à parede)",
          "prescricao": "2×10 reps lentas (cada lado)"
        },
        {
          "codigo": "E-054",
          "nome": "Descida do step excêntrica",
          "prescricao": "3×8 (descida 3-5s)"
        },
        {
          "codigo": "E-057",
          "nome": "Cadeira extensora excêntrica",
          "prescricao": "3×8 (descida 3-5s)"
        },
        {
          "codigo": "E-096",
          "nome": "Nórdico reverso",
          "prescricao": "3×8 (descida 3-5s)"
        },
        {
          "codigo": "E-095",
          "nome": "Agachamento espanhol",
          "prescricao": "3×8 (descida 3-5s)"
        },
        {
          "codigo": "E-036",
          "nome": "Equilíbrio unipodal",
          "prescricao": "3×30-45s cada perna"
        }
      ]
    },
    {
      "num": 3,
      "dias": "31-45",
      "fase": "Fase 2",
      "titulo": "Força Básica em Cadeia Fechada",
      "exercicios": [
        {
          "codigo": "E-061",
          "nome": "Agachamento goblet",
          "prescricao": "3×10-12 moderado"
        },
        {
          "codigo": "E-062",
          "nome": "Agachamento livre (peso corporal) com descida controlada",
          "prescricao": "3×15-20 (ou +carga)"
        },
        {
          "codigo": "E-059",
          "nome": "Afundo estático",
          "prescricao": "3×15 moderado"
        },
        {
          "codigo": "E-095",
          "nome": "Agachamento espanhol",
          "prescricao": "3-4×6-8 (descida 3-5s)"
        },
        {
          "codigo": "E-096",
          "nome": "Nórdico reverso",
          "prescricao": "3-4×6-8 (descida 3-5s)"
        },
        {
          "codigo": "E-097",
          "nome": "Ponte de glúteo unilateral",
          "prescricao": "3×15-20 (ou +carga)"
        }
      ]
    },
    {
      "num": 4,
      "dias": "46-60",
      "fase": "Fase 2",
      "titulo": "Força Avançada e Unilateral",
      "exercicios": [
        {
          "codigo": "E-064",
          "nome": "Agachamento com barra",
          "prescricao": "4×8"
        },
        {
          "codigo": "E-063",
          "nome": "Agachamento búlgaro",
          "prescricao": "4×6-8 (descida 3-5s, +carga)"
        },
        {
          "codigo": "E-060",
          "nome": "Afundo dinâmico com carga",
          "prescricao": "4×8"
        },
        {
          "codigo": "E-057",
          "nome": "Cadeira extensora excêntrica",
          "prescricao": "4×6-8 (descida 3-5s, +carga)"
        },
        {
          "codigo": "E-073",
          "nome": "Elevação pélvica com carga",
          "prescricao": "4×8"
        },
        {
          "codigo": "E-054",
          "nome": "Descida do step excêntrica",
          "prescricao": "4×6-8 (descida 3-5s, +carga)"
        }
      ]
    },
    {
      "num": 5,
      "dias": "61-75",
      "fase": "Fase 3",
      "titulo": "Carga Explosiva e Corrida Progressiva",
      "exercicios": [
        {
          "codigo": "E-063",
          "nome": "Agachamento búlgaro",
          "prescricao": "4×6 pesado"
        },
        {
          "codigo": "E-080",
          "nome": "Salto a partir do agachamento",
          "prescricao": "4×5 (intensidade crescente)"
        },
        {
          "codigo": "E-069",
          "nome": "Levantamento terra romeno",
          "prescricao": "4×6 pesado"
        },
        {
          "codigo": "E-053",
          "nome": "Subida no step baixo",
          "prescricao": "3×10 com carga"
        },
        {
          "codigo": "E-100",
          "nome": "Abdução de quadril em pé com banda",
          "prescricao": "3×10 com carga"
        },
        {
          "codigo": "E-084",
          "nome": "Corrida linear progressiva 60-80-100%",
          "prescricao": "4-6×30-40m a 90-95%"
        }
      ]
    },
    {
      "num": 6,
      "dias": "76-90",
      "fase": "Fase 3",
      "titulo": "Pliometria e Retorno ao Esporte",
      "exercicios": [
        {
          "codigo": "E-064",
          "nome": "Agachamento com barra",
          "prescricao": "4×4-6 (carga alta)"
        },
        {
          "codigo": "E-081",
          "nome": "Saltos unilaterais (hops)",
          "prescricao": "4×4 (intensidade máxima)"
        },
        {
          "codigo": "E-120",
          "nome": "Salto em profundidade (depth jump)",
          "prescricao": "4×4 (intensidade máxima)"
        },
        {
          "codigo": "E-063",
          "nome": "Agachamento búlgaro",
          "prescricao": "4×4-6 (carga alta)"
        },
        {
          "codigo": "E-086",
          "nome": "Mudança de direção a 90° + drills",
          "prescricao": "4-6×30m a 100% + drills"
        },
        {
          "codigo": "E-084",
          "nome": "Corrida linear progressiva 60-80-100%",
          "prescricao": "4-6×30m a 100% + drills"
        }
      ]
    }
  ]
};
