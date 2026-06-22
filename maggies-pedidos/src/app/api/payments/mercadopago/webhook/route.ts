import { NextRequest, NextResponse } from "next/server";
import { applyPaymentToOrder, getOrderById } from "@/lib/data/orders";
import { getMpPayment, getMpToken } from "@/lib/mercadopago";

export const runtime = "nodejs";

/**
 * Webhook de Mercado Pago. MP avisa cuando cambia el estado de un pago.
 * Flujo: leer el id del pago → consultar el pago → ubicar la orden por
 * external_reference (= order.id) → actualizar payment_status.
 *
 * Siempre respondemos 200 ante errores propios para que MP no reintente en
 * loop; los errores se loguean. La fuente de verdad del pago es este webhook,
 * no las pantallas de retorno (back_urls).
 */

async function hmacHex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Valida la firma x-signature (esquema documentado por MP).
 * Solo se exige si MERCADO_PAGO_WEBHOOK_SECRET está seteado.
 */
async function signatureOk(req: NextRequest, dataId: string | null): Promise<boolean> {
  const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET;
  if (!secret) return true; // sin secreto => no se exige firma
  const xSignature = req.headers.get("x-signature");
  const xRequestId = req.headers.get("x-request-id") ?? "";
  if (!xSignature || !dataId) return false;

  const parts: Record<string, string> = {};
  for (const piece of xSignature.split(",")) {
    const [k, v] = piece.split("=").map((s) => s.trim());
    if (k && v) parts[k] = v;
  }
  const ts = parts["ts"];
  const v1 = parts["v1"];
  if (!ts || !v1) return false;

  const manifest = `id:${dataId.toLowerCase()};request-id:${xRequestId};ts:${ts};`;
  const computed = await hmacHex(secret, manifest);
  if (computed.length !== v1.length) return false;
  let diff = 0;
  for (let i = 0; i < computed.length; i++) diff |= computed.charCodeAt(i) ^ v1.charCodeAt(i);
  return diff === 0;
}

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);

    let body: { type?: string; action?: string; data?: { id?: string } } | null = null;
    try {
      body = await req.json();
    } catch {
      body = null;
    }

    const type =
      url.searchParams.get("type") ||
      url.searchParams.get("topic") ||
      body?.type ||
      body?.action ||
      "";
    const paymentId =
      url.searchParams.get("data.id") ||
      url.searchParams.get("id") ||
      body?.data?.id ||
      null;

    // Solo nos interesan notificaciones de pago.
    if (type && !String(type).includes("payment")) {
      return NextResponse.json({ ok: true, ignored: true });
    }
    if (!paymentId) {
      return NextResponse.json({ ok: true, noPayment: true });
    }

    if (!(await signatureOk(req, paymentId))) {
      return NextResponse.json({ error: "invalid_signature" }, { status: 401 });
    }

    const token = getMpToken();
    if (!token) {
      return NextResponse.json({ ok: false, reason: "mp_not_configured" });
    }

    const payment = await getMpPayment(token, String(paymentId));
    if (payment.externalReference) {
      const order = await getOrderById(payment.externalReference);
      if (order) {
        await applyPaymentToOrder(payment.externalReference, payment.id, payment.status);
      }
    }
    return NextResponse.json({ ok: true });
  } catch {
    // 200 para evitar reintentos infinitos por errores propios.
    return NextResponse.json({ ok: false });
  }
}

// MP a veces hace un GET para validar la URL.
export async function GET() {
  return NextResponse.json({ ok: true });
}
