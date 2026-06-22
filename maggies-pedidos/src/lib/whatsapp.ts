import { businessConfig } from "@/config/business";
import { formatPrice } from "@/lib/utils";
import type { CartItem, DatosCheckout, FormaPago, TipoPedido } from "@/types/menu";
import type { OrderWithItems } from "@/types/db";
import {
  DELIVERY_TYPE_LABEL,
  PAYMENT_METHOD_LABEL,
  PAYMENT_STATUS_LABEL,
} from "@/lib/orderLabels";

const ETIQUETA_PAGO: Record<FormaPago, string> = {
  efectivo: "Efectivo",
  transferencia: "Transferencia",
  "debito-credito": "Débito/Crédito en el local",
  "mercado-pago": "Mercado Pago",
};

const ETIQUETA_TIPO: Record<TipoPedido, string> = {
  retiro: "Retiro en el local",
  delivery: "Delivery (envío a domicilio)",
};

/** Subtotal estimado del carrito. */
export function calcularSubtotal(items: CartItem[]): number {
  return items.reduce((acc, it) => acc + it.precio * it.cantidad, 0);
}

/** Cantidad total de unidades en el carrito. */
export function contarUnidades(items: CartItem[]): number {
  return items.reduce((acc, it) => acc + it.cantidad, 0);
}

/**
 * Arma el texto del pedido, ordenado y legible, para enviar por WhatsApp.
 * El total se marca como "estimado" porque el local confirma precio final,
 * disponibilidad y costo de envío.
 */
export function construirMensaje(items: CartItem[], datos: DatosCheckout): string {
  const lineas: string[] = [];

  lineas.push(`Hola ${businessConfig.name}, quiero hacer este pedido:`);
  lineas.push("");
  lineas.push("*Productos:*");

  for (const it of items) {
    const totalLinea = formatPrice(it.precio * it.cantidad);
    lineas.push(`• ${it.cantidad} x ${it.nombre} — ${totalLinea}`);
  }

  lineas.push("");
  lineas.push(`*Total estimado: ${formatPrice(calcularSubtotal(items))}*`);
  lineas.push("");

  lineas.push("*Datos:*");
  lineas.push(`Nombre: ${datos.nombre.trim()}`);
  if (datos.telefono.trim()) {
    lineas.push(`Teléfono: ${datos.telefono.trim()}`);
  }
  lineas.push(`Tipo de pedido: ${ETIQUETA_TIPO[datos.tipo]}`);
  if (datos.tipo === "delivery" && datos.direccion.trim()) {
    lineas.push(`Dirección: ${datos.direccion.trim()}`);
  }
  lineas.push(`Pago: ${ETIQUETA_PAGO[datos.pago]}`);

  if (datos.comentarios.trim()) {
    lineas.push("");
    lineas.push("*Comentarios:*");
    lineas.push(datos.comentarios.trim());
  }

  lineas.push("");
  lineas.push("_(Pedido enviado desde la web de Maggie's)_");

  return lineas.join("\n");
}

/**
 * Construye el link wa.me con el mensaje ya codificado.
 * Abre WhatsApp (app o web) con el texto prearmado.
 */
export function construirLinkWhatsApp(items: CartItem[], datos: DatosCheckout): string {
  const texto = construirMensaje(items, datos);
  return `https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(texto)}`;
}

/**
 * Link de WhatsApp "simple" (sin pedido armado), para los CTA de consulta
 * general del hero, header y barra sticky.
 */
export function linkWhatsAppSimple(mensaje?: string): string {
  const texto =
    mensaje ??
    `Hola ${businessConfig.name}, quiero hacer una consulta sobre el menú de hoy.`;
  return `https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(texto)}`;
}

/**
 * Resumen de un pedido YA REGISTRADO en el sistema, para el botón opcional
 * "Enviar resumen por WhatsApp". Incluye ID, productos, total, datos y estado.
 * WhatsApp queda como aviso/respaldo: el pedido ya está en la base.
 */
export function construirResumenPedido(
  order: OrderWithItems,
  businessName: string = businessConfig.name
): string {
  const l: string[] = [];
  l.push(`Hola ${businessName}, este es el resumen de mi pedido *#${order.order_number}*:`);
  l.push("");
  l.push("*Productos:*");
  for (const it of order.order_items) {
    l.push(`• ${it.quantity} x ${it.product_name} — ${formatPrice(Number(it.total_price))}`);
  }
  l.push("");
  if (Number(order.delivery_fee) > 0) {
    l.push(`Envío: ${formatPrice(Number(order.delivery_fee))}`);
  }
  l.push(`*Total: ${formatPrice(Number(order.total))}*`);
  l.push("");
  l.push("*Datos:*");
  l.push(`Nombre: ${order.customer_name}`);
  if (order.customer_phone) l.push(`Teléfono: ${order.customer_phone}`);
  l.push(`Entrega: ${DELIVERY_TYPE_LABEL[order.delivery_type]}`);
  if (order.delivery_type === "delivery" && order.delivery_address) {
    l.push(`Dirección: ${order.delivery_address}`);
  }
  if (order.delivery_zone?.name) l.push(`Zona: ${order.delivery_zone.name}`);
  if (order.desired_time) l.push(`Horario: ${order.desired_time}`);
  l.push(`Pago: ${PAYMENT_METHOD_LABEL[order.payment_method]}`);
  l.push(`Estado de pago: ${PAYMENT_STATUS_LABEL[order.payment_status]}`);
  l.push("");
  l.push("_Tu pedido ya fue registrado en el sistema._");
  return l.join("\n");
}

/** Link wa.me con el resumen del pedido ya registrado. */
export function linkResumenPedido(
  order: OrderWithItems,
  whatsappNumber?: string,
  businessName?: string
): string {
  const num = whatsappNumber || businessConfig.whatsappNumber;
  return `https://wa.me/${num}?text=${encodeURIComponent(
    construirResumenPedido(order, businessName)
  )}`;
}
