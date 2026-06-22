/**
 * =====================================================================
 *  CONFIGURACIÓN DEL NEGOCIO — Maggie's
 * =====================================================================
 *
 *  Este es el archivo que edita una persona NO técnica para cambiar
 *  datos del negocio (teléfono, horarios, dirección, redes).
 *
 *  ⚠️  ANTES DE PUBLICAR, VALIDAR CON EL NEGOCIO:
 *   - `whatsappNumber`: el número público (4255 9331) parece ser un
 *     teléfono FIJO. WhatsApp necesita un celular. Confirmar el número
 *     real de WhatsApp del local antes de salir a producción.
 *   - `hours`: los horarios públicos son inconsistentes. Confirmar con
 *     el local y ajustar acá; la web se actualiza sola.
 * ---------------------------------------------------------------------
 */

export interface DiaHorario {
  day: string;
  /** Texto libre del horario, o "Cerrado". Ej: "8:00 - 18:30". */
  hours: string;
}

export interface BusinessConfig {
  name: string;
  legalName: string;
  tagline: string;
  shortDescription: string;
  address: string;
  addressShort: string;
  city: string;
  country: string;
  /** Teléfono público para llamadas (puede ser fijo). */
  phone: string;
  /** Teléfono formateado lindo para mostrar. */
  phoneDisplay: string;
  /**
   * Número de WhatsApp en formato internacional SIN "+", espacios ni guiones.
   * Uruguay = 598. Placeholder: 598 + 42559331.
   * ⚠️ VALIDAR: 42559331 parece ser teléfono fijo; WhatsApp requiere celular.
   */
  whatsappNumber: string;
  instagramHandle: string;
  instagramUrl: string;
  /** Link a Google Maps. Si está vacío, se arma uno con la dirección. */
  googleMapsUrl: string;
  hours: DiaHorario[];
}

export const businessConfig: BusinessConfig = {
  name: "Maggie's",
  legalName: "Cafetería Maggie's",
  tagline: "Cafetería & Rotisería en Maldonado",
  shortDescription:
    "Cafetería, confitería y rotisería de barrio en Maldonado. Menú del día, almuerzos caseros, tartas, minutas y take away.",

  address: "Acuña de Figueroa esq. 3 de Febrero, Maldonado",
  addressShort: "Acuña de Figueroa esq. 3 de Febrero",
  city: "Maldonado",
  country: "Uruguay",

  // Teléfono público publicado por el negocio (probable fijo).
  phone: "42559331",
  phoneDisplay: "4255 9331",

  // ⚠️ PLACEHOLDER — VALIDAR con el negocio. 598 = Uruguay.
  // Si el WhatsApp real es un celular, reemplazar por: 598 9X XXX XXX
  // (todo junto, sin "+", sin espacios). Ej: "59899123456".
  whatsappNumber: "59842559331",

  instagramHandle: "@maggiescafeteria",
  instagramUrl: "https://www.instagram.com/maggiescafeteria/",

  // Si se deja vacío, LocationSection arma el link buscando la dirección.
  googleMapsUrl: "",

  // ⚠️ HORARIOS APROXIMADOS — VALIDAR con el negocio y ajustar acá.
  hours: [
    { day: "Lunes", hours: "8:00 - 18:30" },
    { day: "Martes", hours: "8:00 - 18:30" },
    { day: "Miércoles", hours: "8:00 - 18:30" },
    { day: "Jueves", hours: "8:00 - 18:30" },
    { day: "Viernes", hours: "8:00 - 18:30" },
    { day: "Sábado", hours: "Cerrado" },
    { day: "Domingo", hours: "Cerrado" },
  ],
};

/**
 * Orden preferido de las categorías en los filtros del menú.
 * Las categorías que existan en el menú pero no estén acá se agregan
 * al final, en el orden en que aparezcan. "Todo" siempre va primero.
 */
export const categoryOrder: string[] = [
  "Menú del día",
  "Rotisería",
  "Cafetería",
  "Almuerzos",
  "Minutas",
  "Tartas",
  "Sandwiches",
  "Ensaladas",
  "Bizcochos",
  "Confitería",
  "Take away",
  "Servicios lunch",
];

/** Moneda mostrada en toda la web. */
export const CURRENCY_SYMBOL = "$";
