import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase client para uso no SERVIDOR (Server Components, Route Handlers,
 * Server Actions).
 *
 * Next.js 16: `cookies()` de `next/headers` é ASSÍNCRONO — precisa de `await`.
 * Por isso esta função é `async` e deve ser chamada com `await createClient()`.
 *
 * Padrão getAll/setAll (o get/set/remove está deprecado no @supabase/ssr).
 *
 * O `try/catch` em setAll cobre o caso de ser chamado dentro de um
 * Server Component (onde não se pode escrever cookie): nesse cenário o refresh
 * de sessão é feito pelo middleware/proxy, então o erro pode ser ignorado.
 *
 *   const supabase = await createClient()
 *   const { data: { user } } = await supabase.auth.getUser()
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // `setAll` foi chamado a partir de um Server Component.
            // Pode ser ignorado se houver middleware/proxy fazendo o refresh
            // da sessão do usuário.
          }
        },
      },
    },
  );
}
