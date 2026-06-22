import { getServiceClient } from "@/lib/supabase/server";
import type {
  CreateOrderPayload,
  Order,
  OrderStatus,
  OrderWithItems,
  PaymentStatus,
} from "@/types/db";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const isUuid = (v: string | undefined | null): v is string => !!v && UUID_RE.test(v);

const ORDER_SELECT =
  "*, order_items(*), delivery_zone:delivery_zones(id,name,price), business:businesses(name,whatsapp_number,slug)";

/**
 * Crea la orden en Supabase. Los totales se calculan SIEMPRE en el servidor
 * (no se confía en el front). Devuelve la orden con sus ítems.
 */
export async function createOrderInDb(payload: CreateOrderPayload): Promise<OrderWithItems> {
  const supa = getServiceClient();

  const { data: business, error: be } = await supa
    .from("businesses")
    .select("id")
    .eq("slug", payload.businessSlug)
    .single();
  if (be || !business) throw new Error("Negocio no encontrado.");

  const items = (payload.items ?? []).filter((i) => i.quantity > 0);
  if (items.length === 0) throw new Error("El carrito está vacío.");

  // Costo de envío desde la zona (solo si es delivery).
  let deliveryFee = 0;
  let zoneId: string | null = null;
  if (payload.deliveryType === "delivery" && isUuid(payload.deliveryZoneId)) {
    const { data: zone } = await supa
      .from("delivery_zones")
      .select("id, price")
      .eq("id", payload.deliveryZoneId)
      .eq("business_id", business.id)
      .single();
    if (zone) {
      deliveryFee = Number(zone.price);
      zoneId = zone.id;
    }
  }

  const subtotal = items.reduce((acc, i) => acc + i.unitPrice * i.quantity, 0);
  const total = subtotal + deliveryFee;

  // Cliente (registro opcional, no bloquea el pedido si falla).
  let customerId: string | null = null;
  const { data: customer } = await supa
    .from("customers")
    .insert({
      business_id: business.id,
      name: payload.customerName,
      phone: payload.customerPhone ?? null,
      address: payload.deliveryAddress ?? null,
    })
    .select("id")
    .single();
  if (customer) customerId = customer.id;

  const paymentStatus: PaymentStatus =
    payload.paymentMethod === "mercado_pago" ? "pending_payment" : "pending_confirmation";

  const { data: order, error: oe } = await supa
    .from("orders")
    .insert({
      business_id: business.id,
      customer_id: customerId,
      customer_name: payload.customerName,
      customer_phone: payload.customerPhone ?? null,
      delivery_type: payload.deliveryType,
      delivery_zone_id: zoneId,
      delivery_address: payload.deliveryType === "delivery" ? payload.deliveryAddress ?? null : null,
      desired_time: payload.desiredTime ?? null,
      subtotal,
      delivery_fee: deliveryFee,
      total,
      payment_method: payload.paymentMethod,
      payment_status: paymentStatus,
      order_status: "new",
      notes: payload.notes ?? null,
    })
    .select(ORDER_SELECT)
    .single();
  if (oe || !order) throw new Error(`No se pudo crear la orden. ${oe?.message ?? ""}`.trim());

  const rows = items.map((i) => ({
    order_id: (order as Order).id,
    product_id: isUuid(i.productId) ? i.productId : null,
    product_name: i.name,
    quantity: i.quantity,
    unit_price: i.unitPrice,
    total_price: i.unitPrice * i.quantity,
  }));
  const { error: ie } = await supa.from("order_items").insert(rows);
  if (ie) throw new Error(`No se pudieron guardar los ítems. ${ie.message}`);

  return getOrderById((order as Order).id) as Promise<OrderWithItems>;
}

/** Lee una orden con ítems y zona. null si no existe. */
export async function getOrderById(id: string): Promise<OrderWithItems | null> {
  if (!isUuid(id)) return null;
  const supa = getServiceClient();
  const { data, error } = await supa.from("orders").select(ORDER_SELECT).eq("id", id).single();
  if (error || !data) return null;
  return data as unknown as OrderWithItems;
}

/** Lista pedidos del negocio (para el panel), opcionalmente por estado. */
export async function listOrders(
  businessSlug: string,
  statuses?: OrderStatus[]
): Promise<OrderWithItems[]> {
  const supa = getServiceClient();
  const { data: business } = await supa
    .from("businesses")
    .select("id")
    .eq("slug", businessSlug)
    .single();
  if (!business) return [];

  let query = supa
    .from("orders")
    .select(ORDER_SELECT)
    .eq("business_id", business.id)
    .order("created_at", { ascending: false })
    .limit(200);
  if (statuses && statuses.length > 0) query = query.in("order_status", statuses);

  const { data } = await query;
  return (data ?? []) as unknown as OrderWithItems[];
}

/** Cambia el estado del pedido (panel). */
export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
  const supa = getServiceClient();
  const { data, error } = await supa
    .from("orders")
    .update({ order_status: status })
    .eq("id", id)
    .select("*")
    .single();
  if (error || !data) throw new Error(`No se pudo actualizar el estado. ${error?.message ?? ""}`);
  return data as Order;
}

/** Guarda el preference_id de Mercado Pago en la orden. */
export async function setPreferenceId(orderId: string, preferenceId: string): Promise<void> {
  const supa = getServiceClient();
  await supa.from("orders").update({ mercado_pago_preference_id: preferenceId }).eq("id", orderId);
}

/** Mapea el estado de un pago de Mercado Pago a nuestro payment_status. */
export function mapMpStatus(mpStatus: string): PaymentStatus {
  switch (mpStatus) {
    case "approved":
      return "paid";
    case "pending":
    case "in_process":
    case "authorized":
      return "pending_payment";
    case "rejected":
    case "cancelled":
      return "rejected";
    case "refunded":
    case "charged_back":
      return "refunded";
    default:
      return "pending_payment";
  }
}

/** Aplica el resultado de un pago (desde el webhook) a la orden. */
export async function applyPaymentToOrder(
  orderId: string,
  paymentId: string,
  mpStatus: string
): Promise<void> {
  const supa = getServiceClient();
  await supa
    .from("orders")
    .update({
      payment_status: mapMpStatus(mpStatus),
      mercado_pago_payment_id: paymentId,
      mercado_pago_status: mpStatus,
    })
    .eq("id", orderId);
}
