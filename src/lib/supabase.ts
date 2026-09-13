import { createServerClient, parseCookieHeader, type CookieOptions } from '@supabase/ssr';
import type { AstroGlobal, APIContext } from 'astro';

type AstroContext = AstroGlobal | APIContext;

interface CookieToSet {
  name: string;
  value: string;
  options: CookieOptions;
}

export const createSupabaseServerClient = (context: AstroContext) => {
  // Lectura estándar y oficial de Astro
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Las variables PUBLIC_SUPABASE_URL y PUBLIC_SUPABASE_ANON_KEY no están definidas.');
  }

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
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