import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import type { OrderWithItems } from "@/types/db";

/**
 * Integración con Mercado Pago Checkout Pro. SOLO servidor.
 * El access token nunca debe llegar al frontend. Toda creación de
 * preferencias y lectura de pagos pasa por acá, desde API routes.
 */

/** Token efectivo: env global (preferido) o el del negocio (multi-negocio). */
export function getMpToken(businessToken?: string | null): string | null {
  return process.env.MERCADO_PAGO_ACCESS_TOKEN || businessToken || null;
}

export function isMercadoPagoConfigured(): boolean {
  return Boolean(process.env.MERCADO_PAGO_ACCESS_TOKEN);
}

function appUrl(): string {
  return (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:8790").replace(/\/$/, "");
}

/**
 * Crea una preferencia de pago para una orden ya existente en la DB.
 * Devuelve el id de la preferencia y el init_point al que redirigir.
 */
export async function createMpPreference(
  token: string,
  order: OrderWithItems
): Promise<{ id: string; init_point: string }> {
  const client = new MercadoPagoConfig({ accessToken: token });
  const preference = new Preference(client);

  const base = appUrl();

  const items = order.order_items.map((it) => ({
    id: it.product_id ?? it.id,
    title: it.product_name,
    quantity: it.quantity,
    unit_price: Number(it.unit_price),
    currency_id: "UYU",
  }));

  // Costo de envío como ítem aparte si corresponde.
  if (Number(order.delivery_fee) > 0) {
    items.push({
      id: "delivery",
      title: "Costo de envío",
      quantity: 1,
      unit_price: Number(order.delivery_fee),
      currency_id: "UYU",
    });
  }

  const result = await preference.create({
    body: {
      items,
      payer: order.customer_name
        ? {
            name: order.customer_name,
            ...(order.customer_phone
              ? { phone: { number: order.customer_phone } }
              : {}),
          }
        : undefined,
      external_reference: order.id,
      back_urls: {
        success: `${base}/checkout/success?order_id=${order.id}`,
        failure: `${base}/checkout/failure?order_id=${order.id}`,
        pending: `${base}/checkout/pending?order_id=${order.id}`,
      },
      auto_return: "approved",
      notification_url: `${base}/api/payments/mercadopago/webhook`,
      statement_descriptor: "MAGGIES",
    },
  });

  if (!result.id || !result.init_point) {
    throw new Error("Mercado Pago no devolvió un init_point válido.");
  }
  return { id: String(result.id), init_point: result.init_point };
}

/** Lee un pago por id. Devuelve status y external_reference (= order.id). */
export async function getMpPayment(
  token: string,
  paymentId: string
): Promise<{ id: string; status: string; externalReference: string | null }> {
  const client = new MercadoPagoConfig({ accessToken: token });
  const payment = new Payment(client);
  const data = await payment.get({ id: paymentId });
  return {
    id: String(data.id ?? paymentId),
    status: String(data.status ?? "pending"),
    externalReference: data.external_reference ?? null,
  };
}
