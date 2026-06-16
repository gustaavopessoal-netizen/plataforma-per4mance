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
  // Cabeçalhos de segurança (hardening). Aplicados a todas as páginas.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Força HTTPS por 1 ano (anti downgrade)
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          // Impede "adivinhar" tipo de arquivo (anti-XSS via upload)
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Impede que outro site coloque o seu dentro de um iframe (anti-clickjacking)
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          // Não vaza a URL completa de origem para outros sites
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Bloqueia acesso a câmera/microfone/localização
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
