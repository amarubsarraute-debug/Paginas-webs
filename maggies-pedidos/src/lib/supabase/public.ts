import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase PÚBLICO (anon key). Solo puede leer el catálogo según
 * las políticas RLS (businesses activos, categorías, productos, zonas).
 * Seguro para usar en server components de lectura. Devuelve null si no
 * está configurado, para permitir el respaldo al menú local (menu.json).
 */
export function getPublicClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** true si hay credenciales públicas para leer el catálogo desde Supabase. */
export function isPublicSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
