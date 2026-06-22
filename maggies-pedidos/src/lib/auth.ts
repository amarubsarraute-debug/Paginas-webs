/**
 * Autenticación simple del panel /admin.
 *
 * No es un sistema de usuarios: es una sola contraseña (ADMIN_PASSWORD) que
 * habilita una cookie de sesión firmada con HMAC (ADMIN_SESSION_SECRET).
 * Suficiente para proteger el panel de un negocio. Funciona en Node y en el
 * runtime edge (middleware) porque usa Web Crypto.
 */

export const ADMIN_COOKIE = "maggies_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 días

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "maggies-dev-secret";
}

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmac(message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return toHex(sig);
}

/** Valor de cookie firmado: "<timestamp>.<hmac>". */
export async function createSessionValue(): Promise<string> {
  const ts = Date.now().toString();
  return `${ts}.${await hmac(ts)}`;
}

/** Verifica la cookie: firma válida y no vencida. */
export async function verifySessionValue(value: string | undefined | null): Promise<boolean> {
  if (!value) return false;
  const dot = value.lastIndexOf(".");
  if (dot <= 0) return false;
  const ts = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  const expected = await hmac(ts);
  if (sig.length !== expected.length) return false;
  // Comparación en tiempo (casi) constante.
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  if (diff !== 0) return false;
  const age = (Date.now() - Number(ts)) / 1000;
  return age >= 0 && age < MAX_AGE_SECONDS;
}

/** Compara la contraseña ingresada con ADMIN_PASSWORD. */
export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  if (input.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < input.length; i++) diff |= input.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

export const SESSION_MAX_AGE = MAX_AGE_SECONDS;
