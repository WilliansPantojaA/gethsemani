export const prerender = false;

import { createSupabaseServerClient } from '../../lib/supabase';

// GET /api/permiso?idRol=1
export async function GET(context) {
  const supabase = createSupabaseServerClient(context);
  const url = new URL(context.request.url);
  const idrol = url.searchParams.get('idRol') || url.searchParams.get('idrol');

  if (!idrol) {
    return new Response(JSON.stringify({ success: false, message: 'El idRol es requerido' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Llamada a la función PostgreSQL
  const { data, error } = await supabase.rpc('listartodosubmenu', {
    p_idrol: parseInt(idrol)
  });

  if (error) {
    console.error('Error Supabase listartodosubmenu:', error);
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ success: true, data: data || [] }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

// 2. POST / PUT: Corresponde a tu @Url.Action("Guardar", "Permiso")
export async function POST(context) {
  const supabase = createSupabaseServerClient(context);
  const body = await context.request.json();

  // Acepta la estructura anidada o aplanada indistintamente
  const idrol = body.oRol ? body.oRol.idRol : (body.idrol || body.idRol);
  const idsubmenu = body.oSubMenu ? body.oSubMenu.idSubMenu : (body.idsubmenu || body.idSubMenu);
  const seleccionado = body.seleccionado;

  if (!idrol || !idsubmenu) {
    return new Response(JSON.stringify({ resultado: false, mensaje: 'Parámetros incompletos' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Ejecuta el procedimiento almacenado registrarpermiso
  const { error } = await supabase.rpc('registrarpermiso', {
    p_idrol: parseInt(idrol),
    p_idsubmenu: parseInt(idsubmenu),
    p_seleccionado: Boolean(seleccionado)
  });

  if (error) {
    return new Response(JSON.stringify({ resultado: false, mensaje: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ resultado: true, mensaje: 'Permiso actualizado correctamente' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}