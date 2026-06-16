import { BotaoComprar } from "@/components/BotaoComprar";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CourseRow } from "@/components/CourseRow";
import { Row } from "@/components/Row";
import { ProgramCard } from "@/components/ProgramCard";
import { ProgramaBanner } from "@/components/ProgramaBanner";
import { EbookCard } from "@/components/EbookCard";
import { Footer } from "@/components/Footer";
import { protocolos, cursosProfissionais, getCursos, BUNDLE, formatBRL } from "@/data/courses";
import { cursoLiberado } from "@/data/access";
import { getAcessos } from "@/data/entitlements";
import { AcessosProvider } from "@/components/AcessosProvider";
import { programas, getPrograma } from "@/data/programas";
import { ebooks } from "@/data/ebooks";

// Cabeçalho de um bloco de público (Profissionais / Atletas).
function SectionHeader({
  id,
  eyebrow,
  titulo,
  descricao,
  cor,
}: {
  id?: string;
  eyebrow: string;
  titulo: string;
  descricao?: string;
  cor: string;
}) {
  return (
    <div id={id} className="scroll-mt-20 px-4 pt-12 md:px-12">
      <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: cor }}>
        {eyebrow}
      </span>
      <h2 className="mt-1 font-display text-3xl font-extrabold uppercase italic leading-none text-white md:text-4xl">
        {titulo}
      </h2>
      {descricao && <p className="mt-2 max-w-2xl text-sm text-neutral-400">{descricao}</p>}
      <div className="mt-3 h-1 w-16 rounded-full" style={{ background: cor }} />
    </div>
  );
}

export default async function Home() {
  const acessos = await getAcessos();
  const assistindo = getCursos(["joelho", "posterior", "lombar", "tornozelo"]).filter((c) =>
    cursoLiberado(acessos, c.id),
  );

  const avaliacao = getPrograma("avaliacao-360");
  const deVolta = getPrograma("de-volta-ao-jogo");
  const profissionais = programas.filter((p) =>
    ["mentoria-empresarial", "nucleo-do-movimento"].includes(p.id),
  );
  const ebooksAtleta = ebooks.filter((e) => e.publico === "atleta");
  const ebooksTreinador = ebooks.filter((e) => e.publico === "treinador");

  return (
    <main className="relative min-h-screen bg-[#0a0b0f]">
      <Navbar />

      <Hero />

      {/* As fileiras sobem sobre o final do hero, como na Netflix. */}
      <AcessosProvider value={acessos}>
        <div className="relative z-10 -mt-24 md:-mt-28">
          {/* ===================== PARA PROFISSIONAIS ===================== */}
          <SectionHeader
            id="profissionais"
            eyebrow="Para profissionais"
            titulo="Educação Física · Treinadores · Preparadores"
            descricao="Ferramentas e mentoria para quem treina atletas e quer elevar o nível do próprio trabalho."
            cor="#1d6fe8"
          />
          {avaliacao && (
            <div className="px-4 pb-2 pt-4 md:px-12">
              <ProgramaBanner programa={avaliacao} eyebrow="Para profissionais & treinadores" />
            </div>
          )}
          <Row title="Mais para profissionais" anchor="programas">
            {profissionais.map((p) => (
              <ProgramCard key={p.id} programa={p} />
            ))}
          </Row>
          {cursosProfissionais.length > 0 && (
            <CourseRow title="Cursos para Profissionais de Ed. Física" cursos={cursosProfissionais} />
          )}
          <Row title="E-books para Profissionais" anchor="ebooks-prof">
            {ebooksTreinador.map((e) => (
              <EbookCard key={e.id} ebook={e} />
            ))}
          </Row>

          {/* ===================== PARA ATLETAS ===================== */}
          <SectionHeader
            id="atletas"
            eyebrow="Para atletas"
            titulo="Recuperação & Retorno ao Esporte"
            descricao="Da lesão ao retorno em alta performance: o programa De Volta ao Jogo e os 9 protocolos de recuperação."
            cor="#f26d40"
          />
          {deVolta && (
            <div className="px-4 pb-2 pt-4 md:px-12">
              <ProgramaBanner programa={deVolta} eyebrow="Carro-chefe · Programa de 90 dias" />
            </div>
          )}

          <div id="catalogo" />
          {assistindo.length > 0 && (
            <CourseRow
              title="Continue assistindo"
              cursos={assistindo}
              progresso={{ joelho: 65, posterior: 32, lombar: 12, tornozelo: 48 }}
            />
          )}

          <CourseRow title="Os 9 Protocolos do De Volta ao Jogo" cursos={protocolos} />

          {/* Banner da Coleção Completa */}
          <section id="colecao" className="px-4 py-8 md:px-12">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-per-azul/30 via-[#10131b] to-per-laranja/20 p-8 md:p-12">
              <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-per-azul/20 blur-3xl" />
              <div className="relative max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-per-laranja">
                  Acesso completo
                </span>
                <h3 className="mt-2 font-display text-4xl font-extrabold uppercase leading-none text-white md:text-5xl">
                  {BUNDLE.titulo}
                </h3>
                <p className="mt-3 text-neutral-300">{BUNDLE.subtitulo}</p>

                {/* 🎁 Promoção de destaque: leva todos os e-books de bônus */}
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-per-laranja/40 bg-per-laranja/15 px-4 py-2">
                  <span className="text-lg">🎁</span>
                  <span className="text-sm font-bold text-white">
                    Comprando os 9 protocolos você{" "}
                    <span className="text-per-laranja">ganha os {ebooks.length} e-books</span> de bônus
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap items-end gap-4">
                  <div>
                    <p className="text-sm text-neutral-400 line-through">{formatBRL(BUNDLE.precoDe)}</p>
                    <p className="font-display text-4xl font-extrabold text-white">
                      {formatBRL(BUNDLE.preco)}
                    </p>
                    <p className="text-sm text-neutral-400">ou {BUNDLE.parcelas}</p>
                  </div>
                  <BotaoComprar
                    itemId="colecao"
                    label="Liberar os 9 protocolos"
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 font-bold text-black transition-transform hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Biblioteca de e-books — trancados, inclusos na Coleção Completa */}
          <Row title="E-books para Atletas • grátis na Coleção" anchor="ebooks">
            {ebooksAtleta.map((e) => (
              <EbookCard key={e.id} ebook={e} />
            ))}
          </Row>

          <CourseRow
            title="Membros Inferiores"
            cursos={getCursos(["joelho", "tornozelo", "panturrilha", "quadriceps", "posterior"])}
          />

          <CourseRow
            title="Core, Quadril & Coluna"
            cursos={getCursos(["lombar", "pubalgia", "quadril"])}
          />
        </div>
      </AcessosProvider>

      <Footer />
    </main>
  );
}
