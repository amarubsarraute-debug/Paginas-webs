/**
 * Tipos centrales del sistema de pedidos.
 */

/** Un producto del menú, tal como viene del JSON local o del CSV de Google Sheets. */
export interface MenuItem {
  /** Identificador único y estable (kebab-case). Ej: "milanesa-pure". */
  id: string;
  /** Nombre visible del producto. Ej: "Milanesa con puré". */
  nombre: string;
  /** Categoría a la que pertenece. Ej: "Menú del día", "Rotisería". */
  categoria: string;
  /** Descripción corta opcional. */
  descripcion: string;
  /** Precio en pesos uruguayos (número, sin símbolo). */
  precio: number;
  /** URL de imagen opcional. Si está vacía, se muestra un placeholder. */
  imagen: string;
  /** Si está disponible para pedir hoy. false => se muestra "Agotado". */
  disponible: boolean;
  /** Si aparece en "Recomendados de hoy". */
  destacado: boolean;
  /** Si está marcado en la pizarra del día (admin lo activa cada mañana). */
  isToday?: boolean;
  /** Orden de aparición (menor = primero). */
  orden: number;
  /**
   * Stock disponible. null/undefined = no se controla stock exacto.
   * Si es <= 0, el producto no se puede agregar al carrito.
   */
  stock?: number | null;
}

/** Una línea del carrito: un producto + la cantidad elegida. */
export interface CartItem extends MenuItem {
  cantidad: number;
}

/** Cómo recibe el cliente el pedido. */
export type TipoPedido = "retiro" | "delivery";

/** Formas de pago aceptadas (se confirman con el local). */
export type FormaPago =
  | "efectivo"
  | "transferencia"
  | "debito-credito"
  | "mercado-pago";

/** Datos que completa el cliente en el checkout antes de enviar por WhatsApp. */
export interface DatosCheckout {
  nombre: string;
  telefono: string;
  tipo: TipoPedido;
  direccion: string;
  pago: FormaPago;
  comentarios: string;
}

/** Estado de la carga del menú (para mostrar loading / error / ok). */
export type EstadoMenu = "cargando" | "listo" | "error";

/** Origen efectivo del menú que se está mostrando. */
export type FuenteMenu = "csv" | "local";
