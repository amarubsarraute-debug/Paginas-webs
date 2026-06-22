import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase de SERVIDOR con la service_role key.
 * Ignora RLS: úsalo SOLO en API routes / server components / acciones de
 * servidor. NUNCA lo importes desde un componente "use client".
 *
 * La service_role key da acceso total a la base: jamás debe exponerse al
 * navegador ni commitearse.
 */
let cached: SupabaseClient | null = null;

export function getServiceClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase no está configurado: faltan NEXT_PUBLIC_SUPABASE_URL y/o SUPABASE_SERVICE_ROLE_KEY."
    );
  }
  if (!cached) {
    cached = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cached;
}

/** true si hay credenciales de servidor para operar contra Supabase. */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}
