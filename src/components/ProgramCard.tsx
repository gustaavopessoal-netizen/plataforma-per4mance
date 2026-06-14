import Link from "next/link";
import type { Programa } from "@/data/programas";
import { programaHref } from "@/data/programas";

export function ProgramCard({ programa }: { programa: Programa }) {
  const href = programaHref(programa);

  const inner = (
    <div
      className="relative h-[176px] w-[300px] shrink-0 overflow-hidden rounded-xl border-l-4 bg-[#0d0f15] shadow-md transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-black/60 sm:w-[360px]"
      style={{ borderColor: programa.cor }}
    >
      {/* brilho de fundo na cor do produto */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(120% 120% at 100% 100%, ${programa.cor}33 0%, transparent 55%)`,
        }}
      />

      {/* número fantasma */}
      <span
        className="pointer-events-none absolute -bottom-6 -right-2 select-none font-display text-[8rem] font-extrabold italic leading-none"
        style={{ color: `${programa.cor}1f` }}
      >
        {programa.num}
      </span>

      <div className="relative flex h-full flex-col justify-between p-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">
              — {programa.num}
            </span>
            {programa.badge && (
              <span
                className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black"
                style={{ background: programa.cor }}
              >
                {programa.badge}
              </span>
            )}
          </div>
          <p className="mt-1 font-display text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
            {programa.eyebrow}
          </p>
        </div>

        <div>
          <h3 className="font-display text-3xl font-extrabold uppercase italic leading-[0.9] text-white">
            {programa.titulo}
          </h3>
          <div className="mt-2 flex items-center gap-2 text-sm font-medium" style={{ color: programa.cor }}>
            <span>{programa.cta}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
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
