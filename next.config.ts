import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Fixa a raiz do projeto (havia um package-lock.json na pasta home do usuário
  // que confundia a detecção automática do Turbopack).
  turbopack: {
    root: path.resolve("."),
  },
  // Garante que os PDFs privados (servidos por /api/ebooks/[id]) entrem no
  // bundle do deploy (Vercel) — senão o readFile não acha o arquivo em produção.
  outputFileTracingIncludes: {
    "/api/ebooks/[id]": ["./private/ebooks/**"],
  },
};

export default nextConfig;
