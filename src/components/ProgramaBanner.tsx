import Link from "next/link";
import type { Programa } from "@/data/programas";
import { programaHref } from "@/data/programas";

/**
 * Banner GRANDE de destaque para um programa (ex.: Avaliação 360 / De Volta ao Jogo).
 * Abre link externo (nova aba) quando programa.externo, senão a página interna.
 */
export function ProgramaBanner({
  programa,
  eyebrow,
}: {
  programa: Programa;
  eyebrow?: string;
}) {
  const href = programaHref(programa);
  const cor = programa.cor;

  const inner = (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10 p-6 transition-transform duration-300 hover:-translate-y-0.5 sm:p-8 md:p-12"
      style={{ background: `linear-gradient(110deg, ${cor}2e 0%, #10131b 55%, #0a0b0f 100%)` }}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full blur-3xl"
        style={{ background: `${cor}33` }}
      />
      <div className="relative max-w-2xl">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: cor }}>
            {eyebrow ?? programa.eyebrow}
          </span>
          {programa.badge && (
            <span
              className="rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black"
              style={{ background: cor }}
            >
              {programa.badge}
            </span>
          )}
        </div>

        <h3 className="mt-2 font-display text-3xl font-extrabold uppercase italic leading-[0.95] text-white sm:text-4xl md:text-6xl">
          {programa.titulo}
        </h3>
        <p className="mt-3 text-base font-medium text-neutral-200 sm:text-lg md:text-xl">{programa.subtitulo}</p>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-400">{programa.descricao}</p>

        {programa.destaques?.length ? (
          <ul className="mt-5 grid gap-1.5 sm:grid-cols-2">
            {programa.destaques.map((d) => (
              <li key={d} className="flex items-start gap-2 text-sm text-neutral-300">
                <span className="mt-0.5 font-bold" style={{ color: cor }}>
                  ✓
                </span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <span
          className="mt-7 inline-flex items-center gap-2 rounded-lg px-7 py-3 font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-105"
          style={{ background: cor }}
        >
          {programa.cta}
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </div>
  );

  if (programa.externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="group block">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className="group block">
      {inner}
    </Link>
  );
}
