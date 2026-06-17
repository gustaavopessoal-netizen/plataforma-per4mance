import Link from "next/link";
import Image from "next/image";
import { cursos } from "@/data/courses";
import { programas } from "@/data/programas";
import { ebooks } from "@/data/ebooks";

export function Hero() {
  const stats = [
    { num: cursos.length, label: "Protocolos" },
    { num: programas.length, label: "Programas" },
    { num: ebooks.length, label: "E-books" },
  ];

  return (
    <section className="relative h-[92vh] min-h-[600px] w-full overflow-hidden bg-[#0a0b0f]">
      {/* brilhos de fundo na cor da marca */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[28rem] w-[28rem] rounded-full bg-per-azul/20 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-20 right-1/3 h-96 w-96 rounded-full bg-per-laranja/10 blur-[120px]" />

      {/* Gustavo recortado (fundo transparente) */}
      <div className="absolute inset-y-0 right-0 w-[92%] sm:w-[72%] md:w-[56%] lg:w-[52%]">
        {/* halo azul atrás dele para dar profundidade */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-[82%] w-[78%] -translate-x-1/2 rounded-full bg-per-azul/15 blur-[90px]" />
        <Image
          src="/gustavo-cutout.png"
          alt="Gustavo Vieira"
          fill
          priority
          sizes="(max-width:768px) 92vw, 52vw"
          className="object-contain object-bottom drop-shadow-[0_12px_45px_rgba(0,0,0,0.55)]"
        />
        {/* funde a base no fundo (para as fileiras subirem por cima) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0a0b0f] to-transparent" />
      </div>

      {/* gradiente para legibilidade do texto à esquerda */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0b0f] via-[#0a0b0f]/60 to-transparent md:via-[#0a0b0f]/20" />

      {/* Conteúdo */}
      <div className="relative z-10 flex h-full items-end pb-20 md:items-center md:pb-0">
        <div className="mx-auto w-full max-w-[1500px] px-4 md:px-12">
          <div className="max-w-2xl">
            {/* assinatura */}
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/40 py-1.5 pl-1.5 pr-4 backdrop-blur">
              <Image
                src="/logo.png"
                alt="PER4MANCE"
                width={28}
                height={28}
                className="h-7 w-7 rounded-full object-cover"
              />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-200">
                by Gustavo Vieira • Preparador Físico
              </span>
            </div>

            {/* título */}
            <h1 className="font-display text-6xl font-extrabold uppercase leading-[0.86] tracking-tight text-white drop-shadow-2xl md:text-8xl">
              Universo
              <br />
              <span className="text-per-azul">
                PER<span className="text-per-laranja">4</span>MANCE
              </span>
            </h1>

            {/* subtítulo / slogan */}
            <p className="mt-5 font-display text-2xl font-bold uppercase tracking-wide text-white drop-shadow md:text-4xl">
              Seu próximo nível <span className="text-per-azul">começa aqui</span>
            </p>

            {/* apoio */}
            <p className="mt-4 max-w-lg text-base leading-relaxed text-neutral-300 drop-shadow md:text-lg">
              Protocolos de recuperação, programas e e-books — todo o método do
              Gustavo Vieira reunido num só lugar.
            </p>

            {/* números do ecossistema */}
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 md:gap-6">
              {stats.map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5 md:gap-2">
                  <span className="font-display text-2xl font-extrabold text-white md:text-4xl">
                    {s.num}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 md:text-xs">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* ações */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="#catalogo"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3 font-bold text-black transition-transform hover:scale-105 hover:bg-white/90"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Explorar a plataforma
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-7 py-3 font-bold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 17l5-5-5-5M15 12H3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Entrar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
