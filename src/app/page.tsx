import Link from "next/link";
import { BotaoComprar } from "@/components/BotaoComprar";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CourseRow } from "@/components/CourseRow";
import { Row } from "@/components/Row";
import { ProgramCard } from "@/components/ProgramCard";
import { ProgramaBanner } from "@/components/ProgramaBanner";
import { EbookCard } from "@/components/EbookCard";
import { Footer } from "@/components/Footer";
import { protocolos, cursosProfissionais, getCursos, BUNDLE, BUNDLE_PROF, COLECAO_PROF_ID, formatBRL } from "@/data/courses";
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

// ───────────────── Tela de escolha de público (gate) ─────────────────
function EscolhaPublico() {
  return (
    <section className="relative z-10 px-4 pb-24 pt-10 md:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-per-azul">
            Escolha seu caminho
          </span>
          <h2 className="mt-2 font-display text-4xl font-extrabold uppercase leading-none text-white md:text-6xl">
            Por onde você quer começar?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-neutral-400">
            Selecione o seu perfil e veja só o conteúdo feito pra você.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* ATLETAS */}
          <Link
            href="/?p=atleta"
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#13141c] p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-per-laranja/60 hover:shadow-2xl hover:shadow-per-laranja/10 md:p-10"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-per-laranja/20 opacity-60 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative">
              <div className="text-5xl">🏃</div>
              <span className="mt-5 inline-block rounded-full border border-per-laranja/40 bg-per-laranja/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-per-laranja">
                Sou atleta
              </span>
              <h3 className="mt-3 font-display text-3xl font-extrabold uppercase leading-none text-white md:text-4xl">
                Recuperação &amp;<br />Performance
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                Da lesão ao retorno em alta performance: o programa De Volta ao Jogo, os 9 protocolos
                de recuperação e os e-books pra você competir mais forte.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-display text-lg font-bold uppercase tracking-wide text-per-laranja transition-all group-hover:gap-3">
                Entrar <span aria-hidden>→</span>
              </span>
            </div>
          </Link>

          {/* PROFISSIONAIS DA SAÚDE */}
          <Link
            href="/?p=prof"
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#13141c] p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-per-azul/60 hover:shadow-2xl hover:shadow-per-azul/10 md:p-10"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-per-azul/20 opacity-60 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative">
              <div className="text-5xl">🎓</div>
              <span className="mt-5 inline-block rounded-full border border-per-azul/40 bg-per-azul/10 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-per-azul">
                Sou profissional da saúde
              </span>
              <h3 className="mt-3 font-display text-3xl font-extrabold uppercase leading-none text-white md:text-4xl">
                Ferramentas &amp;<br />Mentoria
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                Ed. física, fisioterapeutas e treinadores: a Avaliação 360°, cursos, mentoria e
                e-books pra elevar o nível do seu trabalho e cobrar mais.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-display text-lg font-bold uppercase tracking-wide text-per-azul transition-all group-hover:gap-3">
                Entrar <span aria-hidden>→</span>
              </span>
            </div>
          </Link>
        </div>

        <p className="mt-8 text-center text-xs text-neutral-500">
          Você pode trocar de perfil a qualquer momento no topo da página.
        </p>
      </div>
    </section>
  );
}

// Barra de "Início / trocar público" no topo do conteúdo filtrado.
function BarraPublico({ atual }: { atual: "atleta" | "prof" }) {
  const outro = atual === "prof" ? "atleta" : "prof";
  const cor = atual === "prof" ? "#1d6fe8" : "#f26d40";
  return (
    <div className="px-4 pt-6 md:px-12">
      <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#13141c]/80 px-4 py-3 backdrop-blur">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-white transition-colors hover:text-per-azul"
        >
          <span aria-hidden>←</span> Início
        </Link>
        <span className="hidden text-[0.7rem] font-bold uppercase tracking-[0.2em] text-neutral-400 sm:block">
          Você está em:{" "}
          <span style={{ color: cor }}>{atual === "prof" ? "Profissionais" : "Atletas"}</span>
        </span>
        <Link
          href={`/?p=${outro}`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-sm font-bold text-white transition-colors hover:bg-white/5"
        >
          Ver {outro === "prof" ? "Profissionais" : "Atletas"} <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ p?: string }>;
}) {
  const { p } = await searchParams;
  const publico = p === "atleta" || p === "prof" ? p : null;

  const acessos = await getAcessos();

  // ───── Sem escolha: mostra a tela de seleção ─────
  if (!publico) {
    return (
      <main className="relative min-h-screen bg-[#0a0b0f]">
        <Navbar />
        <Hero />
        <EscolhaPublico />
        <Footer />
      </main>
    );
  }

  const assistindo = getCursos(["joelho", "posterior", "lombar", "tornozelo"]).filter((c) =>
    cursoLiberado(acessos, c.id),
  );
  const avaliacao = getPrograma("avaliacao-360");
  const deVolta = getPrograma("de-volta-ao-jogo");
  const profissionais = programas.filter((prog) =>
    ["mentoria-empresarial", "nucleo-do-movimento"].includes(prog.id),
  );
  const ebooksAtleta = ebooks.filter((e) => e.publico === "atleta");
  const ebooksTreinador = ebooks.filter((e) => e.publico === "treinador");

  return (
    <main className="relative min-h-screen bg-[#0a0b0f]">
      <Navbar />
      <Hero />

      <AcessosProvider value={acessos}>
        <div className="relative z-10 -mt-24 md:-mt-28">
          <BarraPublico atual={publico} />

          {/* ===================== PROFISSIONAIS ===================== */}
          {publico === "prof" && (
            <>
              <SectionHeader
                id="profissionais"
                eyebrow="Para profissionais da saúde"
                titulo="Ed. Física · Fisioterapeutas · Treinadores"
                descricao="Ferramentas e mentoria para quem cuida de atletas e quer elevar o nível do próprio trabalho."
                cor="#1d6fe8"
              />
              {avaliacao && (
                <div className="px-4 pb-2 pt-4 md:px-12">
                  <ProgramaBanner programa={avaliacao} eyebrow="Para profissionais & treinadores" />
                </div>
              )}
              <Row title="Mais para profissionais" anchor="programas">
                {profissionais.map((pr) => (
                  <ProgramCard key={pr.id} programa={pr} />
                ))}
              </Row>
              {cursosProfissionais.length > 0 && (
                <CourseRow title="Cursos para Profissionais de Ed. Física" cursos={cursosProfissionais} />
              )}

              {cursosProfissionais.length > 1 && (
                <section id="colecao-prof" className="scroll-mt-20 px-4 py-8 md:px-12">
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-per-azul/30 via-[#10131b] to-[#0a0b0f] p-6 sm:p-8 md:p-12">
                    <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-per-azul/20 blur-3xl" />
                    <div className="relative max-w-2xl">
                      <span className="text-xs font-bold uppercase tracking-widest text-per-azul">
                        Combo para profissionais
                      </span>
                      <h3 className="mt-2 font-display text-3xl font-extrabold uppercase leading-none text-white sm:text-4xl md:text-5xl">
                        {BUNDLE_PROF.titulo}
                      </h3>
                      <p className="mt-3 text-neutral-300">
                        {BUNDLE_PROF.subtitulo} São {BUNDLE_PROF.qtd} cursos — compre tudo junto e economize.
                      </p>
                      <div className="mt-5 flex flex-wrap items-end gap-4">
                        <div>
                          <p className="text-sm text-neutral-400 line-through">
                            {formatBRL(BUNDLE_PROF.precoDe)}
                          </p>
                          <p className="font-display text-4xl font-extrabold text-white">
                            {formatBRL(BUNDLE_PROF.preco)}
                          </p>
                          <p className="text-sm text-neutral-400">ou {BUNDLE_PROF.parcelas}</p>
                        </div>
                        <BotaoComprar
                          itemId={COLECAO_PROF_ID}
                          label={`Liberar os ${BUNDLE_PROF.qtd} cursos`}
                          className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 font-bold text-black transition-transform hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              )}

              <Row title="E-books para Profissionais" anchor="ebooks-prof">
                {ebooksTreinador.map((e) => (
                  <EbookCard key={e.id} ebook={e} />
                ))}
              </Row>
            </>
          )}

          {/* ===================== ATLETAS ===================== */}
          {publico === "atleta" && (
            <>
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

              <section id="colecao" className="px-4 py-8 md:px-12">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-per-azul/30 via-[#10131b] to-per-laranja/20 p-6 sm:p-8 md:p-12">
                  <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-per-azul/20 blur-3xl" />
                  <div className="relative max-w-2xl">
                    <span className="text-xs font-bold uppercase tracking-widest text-per-laranja">
                      Acesso completo
                    </span>
                    <h3 className="mt-2 font-display text-3xl font-extrabold uppercase leading-none text-white sm:text-4xl md:text-5xl">
                      {BUNDLE.titulo}
                    </h3>
                    <p className="mt-3 text-neutral-300">{BUNDLE.subtitulo}</p>
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
            </>
          )}
        </div>
      </AcessosProvider>

      <Footer />
    </main>
  );
}
