import { createServerClient, parseCookieHeader, type CookieOptions } from '@supabase/ssr';
import type { AstroGlobal, APIContext } from 'astro';

type AstroContext = AstroGlobal | APIContext;

interface CookieToSet {
  name: string;
  value: string;
  options: CookieOptions;
}

export const createSupabaseServerClient = (context: AstroContext) => {
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || "";

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("⚠️ Error: Las variables de entorno de Supabase no están cargadas.");
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
            try {
              context.cookies.set(name, value, options);
            } catch (e) {
              // Evita que caiga el servidor si se intenta escribir cookies en estático
            }
          });
        },
      },
    }
  );
};