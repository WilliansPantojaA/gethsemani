import { defineMiddleware } from 'astro:middleware';
import { createSupabaseServerClient } from './lib/supabase';

// Cambia a true cuando quieras probar la seguridad real
const MODO_DESARROLLO = true; 

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.url.pathname.startsWith('/app')) {
    
    // Si estamos maquetando, dejamos pasar todas las rutas /app
    if (MODO_DESARROLLO) {
      return next();
    }

    const supabase = createSupabaseServerClient(context);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return context.redirect('/login');
    }
  }

  return next();
});