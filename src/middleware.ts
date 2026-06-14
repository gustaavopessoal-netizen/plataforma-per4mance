import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Renova a sessão Supabase em cada request (mantém o login vivo).
export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Roda em tudo, EXCETO arquivos estáticos e imagens:
     * - _next/static, _next/image, favicon.ico
     * - svg, png, jpg, jpeg, gif, webp, ico
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
