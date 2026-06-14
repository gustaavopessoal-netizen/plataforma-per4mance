"use client";

import { createContext, useContext, type ReactNode } from "react";
import { ACESSOS_VISITANTE, type Acessos } from "@/data/access";

// Default = visitante (tudo trancado). Assim, um card renderizado FORA do
// provider nunca "vaza" acesso — fica trancado, sem quebrar.
const AcessosContext = createContext<Acessos>(ACESSOS_VISITANTE);

export function AcessosProvider({
  value,
  children,
}: {
  value: Acessos;
  children: ReactNode;
}) {
  return <AcessosContext.Provider value={value}>{children}</AcessosContext.Provider>;
}

export function useAcessos(): Acessos {
  return useContext(AcessosContext);
}
