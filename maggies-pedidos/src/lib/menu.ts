import menuLocal from "@/data/menu.json";
import { categoryOrder } from "@/config/business";
import type { MenuItem } from "@/types/menu";
import { parseBoolean, parsePrice, slugify } from "@/lib/utils";

/** Columnas esperadas en el CSV de Google Sheets. */
const COLUMNAS = [
  "id",
  "nombre",
  "categoria",
  "descripcion",
  "precio",
  "imagen",
  "disponible",
  "destacado",
  "orden",
] as const;

/**
 * Menú local (respaldo). Se usa cuando NO hay CSV configurado o cuando
 * la carga del CSV falla. Tipado y ordenado.
 */
export function getMenuLocal(): MenuItem[] {
  return normalizarMenu(menuLocal as unknown as MenuItem[]);
}

/** URL del CSV configurada por variable de entorno (puede no existir). */
export function getCsvUrl(): string | undefined {
  const url = process.env.NEXT_PUBLIC_MENU_CSV_URL?.trim();
  return url ? url : undefined;
}

/**
 * Normaliza, valida y ordena una lista de productos:
 *  - descarta filas sin nombre,
 *  - completa id si falta (a partir del nombre),
 *  - garantiza tipos correctos,
 *  - ordena por `orden` y luego por nombre.
 */
export function normalizarMenu(items: MenuItem[]): MenuItem[] {
  const limpio = (items || [])
    .filter((it) => it && String(it.nombre ?? "").trim() !== "")
    .map((it, i) => {
      const nombre = String(it.nombre).trim();
      const id = String(it.id ?? "").trim() || slugify(nombre) || `item-${i}`;
      return {
        id,
        nombre,
        categoria: String(it.categoria ?? "Otros").trim() || "Otros",
        descripcion: String(it.descripcion ?? "").trim(),
        precio:
          typeof it.precio === "number" ? it.precio : parsePrice(it.precio as unknown as string),
        imagen: String(it.imagen ?? "").trim(),
        disponible:
          typeof it.disponible === "boolean"
            ? it.disponible
            : parseBoolean(it.disponible as unknown as string, true),
        destacado:
          typeof it.destacado === "boolean"
            ? it.destacado
            : parseBoolean(it.destacado as unknown as string, false),
        orden: Number.isFinite(it.orden as number)
          ? (it.orden as number)
          : parsePrice(it.orden as unknown as string) || i + 1,
      } satisfies MenuItem;
    });

  // Evita ids duplicados (rompería el carrito).
  const vistos = new Map<string, number>();
  for (const it of limpio) {
    const n = vistos.get(it.id) ?? 0;
    if (n > 0) it.id = `${it.id}-${n + 1}`;
    vistos.set(it.id, n + 1);
  }

  return limpio.sort((a, b) => a.orden - b.orden || a.nombre.localeCompare(b.nombre, "es"));
}

/**
 * Parser de CSV tolerante a comillas y a comas dentro de campos entre comillas.
 * Devuelve filas como arrays de strings.
 */
function parseCSVRows(texto: string): string[][] {
  const filas: string[][] = [];
  let campo = "";
  let fila: string[] = [];
  let enComillas = false;

  // Normaliza saltos de línea.
  const s = texto.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  for (let i = 0; i < s.length; i++) {
    const c = s[i];

    if (enComillas) {
      if (c === '"') {
        if (s[i + 1] === '"') {
          campo += '"';
          i++;
        } else {
          enComillas = false;
        }
      } else {
        campo += c;
      }
      continue;
    }

    if (c === '"') {
      enComillas = true;
    } else if (c === ",") {
      fila.push(campo);
      campo = "";
    } else if (c === "\n") {
      fila.push(campo);
      filas.push(fila);
      fila = [];
      campo = "";
    } else {
      campo += c;
    }
  }

  // Último campo / fila si el archivo no termina en salto de línea.
  if (campo !== "" || fila.length > 0) {
    fila.push(campo);
    filas.push(fila);
  }

  return filas.filter((f) => f.some((celda) => celda.trim() !== ""));
}

/**
 * Convierte el texto CSV (de Google Sheets) en una lista de MenuItem.
 * Usa la primera fila como encabezados y mapea por nombre de columna,
 * así no importa el orden exacto de las columnas en la planilla.
 */
export function parseMenuCSV(csv: string): MenuItem[] {
  const filas = parseCSVRows(csv);
  if (filas.length < 2) return [];

  const encabezados = filas[0].map((h) => h.trim().toLowerCase());
  const indice: Record<string, number> = {};
  for (const col of COLUMNAS) {
    indice[col] = encabezados.indexOf(col);
  }

  // Si ni siquiera está la columna "nombre", el CSV no sirve.
  if (indice["nombre"] === -1) return [];

  const get = (fila: string[], col: (typeof COLUMNAS)[number]): string => {
    const idx = indice[col];
    return idx >= 0 && idx < fila.length ? (fila[idx] ?? "").trim() : "";
  };

  const items: MenuItem[] = filas.slice(1).map((fila, i) => ({
    id: get(fila, "id"),
    nombre: get(fila, "nombre"),
    categoria: get(fila, "categoria"),
    descripcion: get(fila, "descripcion"),
    precio: parsePrice(get(fila, "precio")),
    imagen: get(fila, "imagen"),
    disponible: parseBoolean(get(fila, "disponible"), true),
    destacado: parseBoolean(get(fila, "destacado"), false),
    orden: parsePrice(get(fila, "orden")) || i + 1,
  }));

  return normalizarMenu(items);
}

/**
 * Construye la lista de categorías para los filtros, en el orden preferido
 * definido en la config. Siempre arranca con "Todo".
 */
export function getCategorias(items: MenuItem[]): string[] {
  const presentes = Array.from(new Set(items.map((i) => i.categoria))).filter(Boolean);

  presentes.sort((a, b) => {
    const ia = categoryOrder.indexOf(a);
    const ib = categoryOrder.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b, "es");
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });

  return ["Todo", ...presentes];
}
