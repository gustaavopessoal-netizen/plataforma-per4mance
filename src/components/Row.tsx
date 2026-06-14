"use client";

import { useRef } from "react";

export function Row({
  title,
  anchor,
  children,
}: {
  title: string;
  anchor?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    ref.current?.scrollBy({
      left: dir * Math.min(ref.current.clientWidth * 0.8, 720),
      behavior: "smooth",
    });
  };

  return (
    <section id={anchor} className="group/row relative scroll-mt-20 py-4">
      <h2 className="mb-2 px-4 font-display text-xl font-bold uppercase tracking-wide text-neutral-100 md:px-12 md:text-2xl">
        {title}
      </h2>

      <div className="relative">
        <button
          aria-label="Anterior"
          onClick={() => scroll(-1)}
          className="absolute left-0 top-0 z-20 hidden h-full w-10 place-items-center bg-gradient-to-r from-black/70 to-transparent text-white opacity-0 transition-opacity duration-200 group-hover/row:opacity-100 md:grid md:w-12"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          ref={ref}
          className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth px-4 pb-4 pt-2 md:px-12"
        >
          {children}
        </div>

        <button
          aria-label="Próximo"
          onClick={() => scroll(1)}
          className="absolute right-0 top-0 z-20 hidden h-full w-10 place-items-center bg-gradient-to-l from-black/70 to-transparent text-white opacity-0 transition-opacity duration-200 group-hover/row:opacity-100 md:grid md:w-12"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m9 18 6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
