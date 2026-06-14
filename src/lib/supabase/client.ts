import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase client para uso no BROWSER (Client Components, 'use client').
 *
 * No browser, o @supabase/ssr gerencia os cookies automaticamente via
 * document.cookie — NÃO passe a opção `cookies` aqui.
 *
 * Importe e chame dentro do componente:
 *   const supabase = createClient()
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
