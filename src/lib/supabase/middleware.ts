import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Faz o refresh da sessão Supabase em cada request e reescreve os cookies
 * atualizados tanto no request (para Server Components mais abaixo na cadeia)
 * quanto no response (para o browser).
 *
 * Padrão oficial @supabase/ssr. Chame este helper a partir do
 * `middleware.ts` (ou `proxy.ts`, ver nota abaixo) na raiz.
 *
 * IMPORTANTE @supabase/ssr 0.12.x:
 *   `setAll(cookiesToSet, headers)` agora recebe um SEGUNDO argumento `headers`
 *   (Record<string,string>) com Cache-Control/Expires/Pragma que evitam que um
 *   CDN/proxy cacheie um response com Set-Cookie de sessão. Aplique-os no
 *   response.
 *
 * IMPORTANTE: NÃO coloque lógica entre criar o client e chamar getClaims().
 * Um simples erro aqui pode causar logout aleatório do usuário.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          // Atualiza os cookies no request (para o resto da cadeia do servidor).
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          // Recria o response com o request já atualizado.
          supabaseResponse = NextResponse.next({
            request,
          });

          // Escreve os cookies no response (para o browser)...
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });

          // ...e os headers anti-cache exigidos pelo @supabase/ssr 0.12.x.
          for (const [key, val] of Object.entries(headers)) {
            supabaseResponse.headers.set(key, val);
          }
        },
      },
    },
  );

  // NÃO remova esta linha. getClaims() valida/refresca a sessão.
  // (getClaims é a forma recomendada; getUser() também funciona e bate no
  // Auth server a cada chamada.)
  await supabase.auth.getClaims();

  // IMPORTANTE: retorne o `supabaseResponse` exatamente como está.
  // Se for criar um novo NextResponse, COPIE os cookies dele:
  //   const myResponse = NextResponse.redirect(new URL('/login', request.url))
  //   myResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  //   return myResponse
  // Caso contrário a sessão do browser e do servidor podem dessincronizar e o
  // usuário será deslogado prematuramente.
  return supabaseResponse;
}
