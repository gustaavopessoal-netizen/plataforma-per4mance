import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Roda em todos os paths EXCETO:
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagem do next/image)
     * - favicon.ico
     * - arquivos de imagem comuns (svg, png, jpg, jpeg, gif, webp)
     * Adicione outros paths públicos conforme necessário.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
