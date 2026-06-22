import { CURRENCY_SYMBOL } from "@/config/business";

/**
 * Une clases condicionales sin dependencias externas.
 * Ej: cn("base", activo && "activo", undefined) => "base activo"
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Formatea un precio en pesos uruguayos.
 * 1850 => "$1.850"   ·   340 => "$340"
 */
export function formatPrice(value: number): string {
  const safe = Number.isFinite(value) ? Math.round(value) : 0;
  const conSeparador = safe.toLocaleString("es-UY");
  return `${CURRENCY_SYMBOL}${conSeparador}`;
}

/**
 * Parsea un valor de texto a booleano de forma tolerante.
 * Acepta: true, 1, si, sí, x, ✓, verdadero (en cualquier mayúscula/minúscula).
 * Vacío => devuelve `fallback`.
 */
export function parseBoolean(raw: string | undefined | null, fallback = false): boolean {
  if (raw === undefined || raw === null) return fallback;
  const v = String(raw).trim().toLowerCase();
  if (v === "") return fallback;
  return ["true", "1", "si", "sí", "x", "✓", "yes", "verdadero", "y"].includes(v);
}

/**
 * Parsea un precio que puede venir como "320", "$ 320", "1.850" o "1,850".
 */
export function parsePrice(raw: string | number | undefined | null): number {
  if (typeof raw === "number") return raw;
  if (!raw) return 0;
  // Quita símbolos de moneda y espacios; quita separadores de miles.
  const limpio = String(raw)
    .replace(/[^\d,.-]/g, "")
    .replace(/\.(?=\d{3}(\D|$))/g, "") // puntos de miles
    .replace(",", "."); // coma decimal -> punto
  const n = parseFloat(limpio);
  return Number.isFinite(n) ? n : 0;
}

/** Convierte texto a un slug seguro para usar como id. */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // quita acentos/diacríticos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Fecha de hoy en formato legible, ej: "miércoles 18 de junio". */
export function fechaHoyLegible(): string {
  try {
    const f = new Date().toLocaleDateString("es-UY", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    return f;
  } catch {
    return "";
  }
}
