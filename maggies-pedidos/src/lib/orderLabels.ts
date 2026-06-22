import type {
  DeliveryType,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "@/types/db";

/** Pasos visibles del estado del pedido (cancelado se muestra aparte). */
export const ORDER_STATUS_STEPS: OrderStatus[] = [
  "new",
  "confirmed",
  "preparing",
  "ready",
  "delivered",
];

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  new: "Pedido recibido",
  confirmed: "Confirmado",
  preparing: "En preparación",
  ready: "Listo",
  delivered: "Entregado",
  cancelled: "Cancelado",
};

export const PAYMENT_STATUS_LABEL: Record<PaymentStatus, string> = {
  pending_confirmation: "Pago a coordinar con el local",
  pending_payment: "Esperando confirmación de pago",
  paid: "Pago aprobado",
  rejected: "Pago rechazado",
  cancelled: "Pago cancelado",
  refunded: "Pago reembolsado",
};

export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  cash: "Efectivo",
  bank_transfer: "Transferencia bancaria",
  mercado_pago: "Mercado Pago",
  card_on_pickup: "Débito/crédito al retirar",
  coordinate_whatsapp: "A coordinar por WhatsApp",
};

export const DELIVERY_TYPE_LABEL: Record<DeliveryType, string> = {
  pickup: "Retiro en local",
  delivery: "Delivery",
};

export type Tone = "green" | "yellow" | "gray" | "red";

/** Color del badge según el estado de pago. */
export function paymentTone(status: PaymentStatus): Tone {
  if (status === "paid") return "green";
  if (status === "rejected" || status === "cancelled") return "red";
  if (status === "pending_payment") return "gray";
  return "yellow"; // pending_confirmation, refunded
}

/** Clases Tailwind por tono (para badges). */
export const TONE_CLASSES: Record<Tone, string> = {
  green: "bg-sage-light text-sage-dark border border-sage/30",
  yellow: "bg-amber-100 text-amber-800 border border-amber-300/60",
  gray: "bg-beige text-ink-soft border border-beige-dark",
  red: "bg-red-100 text-red-700 border border-red-300/60",
};
