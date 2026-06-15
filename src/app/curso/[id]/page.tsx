import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { CourseRow } from "@/components/CourseRow";
import { Footer } from "@/components/Footer";
import { cursos, getCurso, formatBRL } from "@/data/courses";
import { cursoLiberado } from "@/data/access";
import { getAcessos } from "@/data/entitlements";
import { AcessosProvider } from "@/components/AcessosProvider";
import { BotaoComprar } from "@/components/BotaoComprar";
import { PlayerCurso } from "@/components/PlayerCurso";
import { Fichas } from "@/components/Fichas";
import { getVideosDoCurso } from "@/data/videos";

export function generateStaticParams() {
  return cursos.map((c) => ({ id: c.id }));
}

export default async function CursoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const curso = getCurso(id);
  if (!curso) notFound();

  const relacionados = cursos.filter((c) => c.id !== curso.id).slice(0, 8);
  const acessos = await getAcessos();
  const liberado = cursoLiberado(acessos, curso.id);
  // Só carrega os vídeos para quem tem acesso (não vaza link p/ não-comprador).
  const videos = liberado ? await getVideosDoCurso(curso.id) : {};

  // SEGURANÇA: quem NÃO comprou não recebe nem título nem exercícios das fichas
  // (senão dava pra copiar o método pelo código-fonte da página). Só a estrutura.
  const modulosVisiveis = liberado
    ? curso.modulos
    : curso.modulos.map((m) => ({
        num: m.num,
        titulo: "",
        fase: m.fase,
        dias: m.dias,
        exercicios: [],
      }));

  return (
    <main className="relative min-h-screen bg-[#0a0b0f]">
      <Navbar />

      {/* Player / banner do curso */}
      <section className="relative h-[70vh] min-h-[460px] w-full">
        <Image
          src={curso.capa}
          alt={curso.regiao}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0f] via-[#0a0b0f]/30 to-[#0a0b0f]/60" />

        {/* botão central: play (liberado) ou cadeado (bloqueado) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {liberado ? (
            <>
              <button
                aria-label="Assistir"
                className="grid h-20 w-20 place-items-center rounded-full bg-white/95 text-black shadow-2xl transition-transform hover:scale-110"
              >
                <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <span className="mt-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-medium text-neutral-300 backdrop-blur">
                Você tem acesso • role para assistir às aulas
              </span>
            </>
          ) : (
            <>
              <div className="grid h-20 w-20 place-items-center rounded-full bg-black/60 text-white ring-2 ring-white/30 backdrop-blur">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="11" width="16" height="9" rx="2" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
                </svg>
              </div>
              <span className="mt-4 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-xs font-medium text-neutral-200 backdrop-blur">
                Curso bloqueado • compre para liberar as aulas
              </span>
            </>
          )}
        </div>

        {/* voltar */}
        <Link
          href="/"
          className="absolute left-4 top-20 z-10 inline-flex items-center gap-1 rounded-full bg-black/50 px-3 py-1.5 text-sm text-neutral-200 backdrop-blur transition-colors hover:bg-black/70 md:left-12"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Voltar
        </Link>
      </section>

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto -mt-24 max-w-[1500px] px-4 pb-8 md:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
          {/* Coluna principal */}
          <div>
            {liberado && (
              <div className="mb-8">
                <PlayerCurso modulos={curso.modulos} videos={videos} cor={curso.cor} />
              </div>
            )}

            <div className="mb-3 flex items-center gap-2">
              <span
                className="rounded px-2 py-1 text-xs font-extrabold uppercase tracking-widest text-black"
                style={{ background: curso.cor }}
              >
                PER4MANCE Original
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                Protocolo {curso.num}
              </span>
            </div>

            <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] text-white md:text-7xl">
              {curso.regiao} <span style={{ color: curso.cor }}>{curso.tagline}</span>
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-neutral-300">
              <span className="font-bold text-emerald-400">98% de recuperação</span>
              <span className="text-neutral-600">•</span>
              <span>{curso.duracaoTotal}</span>
              <span className="text-neutral-600">•</span>
              <span>{curso.modulos.length} módulos</span>
              <span className="text-neutral-600">•</span>
              <span className="rounded border border-white/30 px-1.5 text-xs">{curso.nivel}</span>
            </div>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-200 md:text-lg">
              {curso.descricao}
            </p>

            {/* Para quem é */}
            <div className="mt-8">
              <h2 className="font-display text-2xl font-bold uppercase text-white">Para quem é</h2>
              <ul className="mt-3 space-y-2">
                {curso.paraQuem.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-300">
                    <span
                      className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full text-black"
                      style={{ background: curso.cor }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Fichas do protocolo — 90 dias / 3 fases */}
            <div className="mt-10">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-display text-2xl font-bold uppercase text-white">
                  Fichas do protocolo
                </h2>
                <span className="text-sm text-neutral-400">
                  {curso.modulos.length} fichas · 90 dias
                </span>
              </div>
              <Fichas modulos={modulosVisiveis} liberado={liberado} cor={curso.cor} />
            </div>
          </div>

          {/* Sidebar de compra */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-white/10 bg-[#11131a] p-6 shadow-xl">
              {liberado ? (
                <>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-black"
                    style={{ background: curso.cor }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Você tem acesso
                  </span>
                  <p className="mt-3 text-sm text-neutral-400">Acesso vitalício liberado a este protocolo.</p>
                  <button
                    className="mt-5 w-full rounded-lg py-3 font-bold text-black transition-transform hover:scale-[1.02]"
                    style={{ background: curso.cor }}
                  >
                    Continuar assistindo
                  </button>
                </>
              ) : (
                <>
                  <p className="text-sm text-neutral-400">Acesso vitalício a este protocolo</p>
                  <p className="mt-1 font-display text-4xl font-extrabold text-white">
                    {formatBRL(curso.preco)}
                  </p>
                  <p className="text-sm text-neutral-400">ou 5x de {formatBRL(curso.preco / 5)}</p>

                  <BotaoComprar
                    itemId={curso.id}
                    label="Comprar agora"
                    className="mt-5 w-full rounded-lg py-3 font-bold text-black transition-transform hover:scale-[1.02]"
                    style={{ background: curso.cor }}
                  />
                  <p className="mt-2 text-center text-xs text-neutral-500">
                    Pagamento via Asaas — Pix, cartão ou boleto
                  </p>
                </>
              )}

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-sm font-semibold text-white">Quer todos os 9 protocolos?</p>
                <p className="mt-1 text-sm text-neutral-400">
                  Garanta a Coleção Completa por R$ 547 (10x R$ 54,70).
                </p>
                <Link
                  href="/#colecao"
                  className="mt-3 block rounded-lg border border-white/15 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-white/5"
                >
                  Ver a Coleção Completa
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Relacionados (CourseCard é client → precisa do provider) */}
      <AcessosProvider value={acessos}>
        <CourseRow title="Protocolos parecidos" cursos={relacionados} />
      </AcessosProvider>

      <Footer />
    </main>
  );
}
