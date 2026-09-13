export const prerender = false; // 👈 OBLIGATORIO para peticiones dinámicas POST/PUT/DELETE

import { createSupabaseServerClient } from '../../lib/supabase';

// GET: Listar roles
export async function GET(context) {
  const supabase = createSupabaseServerClient(context);
  const { data, error } = await supabase.rpc('listarrol');

  if (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ success: true, data }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// POST: Registrar nuevo rol
export async function POST(context) {
  const supabase = createSupabaseServerClient(context);
  
  let body;
  try {
    body = await context.request.json();
  } catch (e) {
    return new Response(JSON.stringify({ success: false, message: 'Cuerpo de petición JSON inválido o vacío.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { rol } = body;

  if (!rol || rol.trim() === '') {
    return new Response(JSON.stringify({ success: false, message: 'El nombre del rol es requerido.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { error } = await supabase.rpc('registrarrol', { p_rol: rol });

  if (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ success: true, message: 'Rol registrado correctamente.' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// PUT: Actualizar rol
export async function PUT(context) {
  const supabase = createSupabaseServerClient(context);

  let body;
  try {
    body = await context.request.json();
  } catch (e) {
    return new Response(JSON.stringify({ success: false, message: 'JSON inválido.' }), { status: 400 });
  }

  const { idrol, rol, estado } = body;

  const { error } = await supabase.rpc('actualizarrol', {
    p_idrol: parseInt(idrol),
    p_rol: rol,
    p_estado: estado
  });

  if (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ success: true, message: 'Rol actualizado correctamente.' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// DELETE: Eliminar rol
export async function DELETE(context) {
  const supabase = createSupabaseServerClient(context);

  let body;
  try {
    body = await context.request.json();
  } catch (e) {
    return new Response(JSON.stringify({ success: false, message: 'JSON inválido.' }), { status: 400 });
  }

  const { idrol } = body;

  const { error } = await supabase.rpc('eliminarrol', { p_idrol: parseInt(idrol) });

  if (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ success: true, message: 'Rol eliminado correctamente.' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// PATCH: Cambiar únicamente el estado del rol
export async function PATCH(context) {
    const supabase = createSupabaseServerClient(context);
  
    let body;
    try {
      body = await context.request.json();
    } catch (e) {
      return new Response(JSON.stringify({ success: false, message: 'JSON inválido.' }), { status: 400 });
    }
  
    const { idrol, estado } = body;
  
    const { error } = await supabase.rpc('cambiarestadorol', {
      p_idrol: parseInt(idrol),
      p_estado: estado
    });
  
    if (error) {
      return new Response(JSON.stringify({ success: false, message: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  
    return new Response(JSON.stringify({ success: true, message: 'Estado actualizado correctamente.' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }