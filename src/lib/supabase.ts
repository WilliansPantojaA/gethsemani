import { createServerClient, parseCookieHeader, type CookieOptions } from '@supabase/ssr';
import type { AstroGlobal, APIContext } from 'astro';

// Acepta AstroGlobal (en páginas/layouts) o APIContext (en middleware/endpoints)
type AstroContext = AstroGlobal | APIContext;

// Definición del tipo de objeto que entrega Supabase para las cookies
interface CookieToSet {
  name: string;
  value: string;
  options: CookieOptions;
}

export const createSupabaseServerClient = (context: AstroContext) => {
  const env = (import.meta as any).env;

  return createServerClient(
    env.PUBLIC_SUPABASE_URL,
    env.PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(context.request.headers.get('Cookie') ?? '');
        },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            context.cookies.set(name, value, options);
          });
        },
      },
    }
  );
};