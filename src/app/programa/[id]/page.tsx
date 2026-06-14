import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { programas, getPrograma } from "@/data/programas";

export function generateStaticParams() {
  return programas.map((p) => ({ id: p.id }));
}

export default async function ProgramaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const programa = getPrograma(id);
  if (!programa) notFound();

  return (
    <main className="relative min-h-screen bg-[#0a0b0f]">
      <Navbar />

      {/* Hero do programa */}
      <section className="relative overflow-hidden pt-16">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            background: `radial-gradient(90% 90% at 100% 0%, ${programa.cor}33 0%, transparent 55%)`,
          }}
        />
        <div className="relative mx-auto max-w-[1500px] px-4 py-12 md:px-12 md:py-16">
          <Link
            href="/#programas"
            className="mb-6 inline-flex items-center gap-1 text-sm text-neutral-300 transition-colors hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Voltar ao ecossistema
          </Link>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="rounded px-2 py-1 text-xs font-extrabold uppercase tracking-widest text-black"
                  style={{ background: programa.cor }}
                >
                  PER4MANCE
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                  {programa.eyebrow}
                </span>
                {programa.badge && (
                  <span className="rounded border border-white/25 px-2 py-0.5 text-xs font-semibold text-neutral-200">
                    {programa.badge}
                  </span>
                )}
              </div>

              <h1 className="font-display text-5xl font-extrabold uppercase italic leading-[0.9] text-white md:text-7xl">
                {programa.titulo}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-neutral-200">{programa.subtitulo}</p>
              <p className="mt-4 max-w-xl leading-relaxed text-neutral-300">{programa.descricao}</p>

              <div className="mt-7">
                {programa.url ? (
                  <a
                    href={programa.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg px-7 py-3 font-bold text-black transition-transform hover:scale-105"
                    style={{ background: programa.cor }}
                  >
                    {programa.cta}
                    <span>→</span>
                  </a>
                ) : (
                  <div className="inline-flex flex-col gap-2">
                    <button
                      className="inline-flex items-center gap-2 rounded-lg px-7 py-3 font-bold text-black transition-transform hover:scale-105"
                      style={{ background: programa.cor }}
                    >
                      {programa.cta}
                    </button>
                    <span className="text-xs text-neutral-500">
                      Em breve disponível dentro da plataforma.
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Banner designado do produto */}
            {programa.banner && (
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                <Image
                  src={programa.banner}
                  alt={programa.titulo}
                  width={900}
                  height={500}
                  className="h-auto w-full object-contain"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section className="mx-auto max-w-[1500px] px-4 pb-16 md:px-12">
        <h2 className="font-display text-2xl font-bold uppercase text-white">O que você leva</h2>
        <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {programa.destaques.map((d, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-neutral-200"
            >
              <span
                className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-black"
                style={{ background: programa.cor }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {d}
            </li>
          ))}
        </ul>
      </section>

      <Footer />
    </main>
  );
}
