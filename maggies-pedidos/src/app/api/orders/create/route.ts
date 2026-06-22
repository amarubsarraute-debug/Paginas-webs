import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { createOrderInDb } from "@/lib/data/orders";
import type { CreateOrderPayload } from "@/types/db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        error: "ordering_disabled",
        message:
          "El sistema de pedidos todavía no está conectado a la base de datos. Podés enviar tu pedido por WhatsApp.",
      },
      { status: 503 }
    );
  }

  let body: CreateOrderPayload;
  try {
    body = (await req.json()) as CreateOrderPayload;
  } catch {
    return NextResponse.json({ error: "bad_json", message: "Pedido inválido." }, { status: 400 });
  }

  // Validaciones de borde (las mismas reglas que el front).
  if (!body.customerName?.trim()) {
    return NextResponse.json(
      { error: "name_required", message: "El nombre es obligatorio." },
      { status: 400 }
    );
  }
  if (!Array.isArray(body.items) || body.items.length === 0) {
    return NextResponse.json(
      { error: "empty_cart", message: "El carrito está vacío." },
      { status: 400 }
    );
  }
  if (body.deliveryType === "delivery") {
    if (!body.deliveryAddress?.trim()) {
      return NextResponse.json(
        { error: "address_required", message: "Para delivery, la dirección es obligatoria." },
        { status: 400 }
      );
    }
    if (!body.deliveryZoneId) {
      return NextResponse.json(
        { error: "zone_required", message: "Elegí una zona de delivery." },
        { status: 400 }
      );
    }
  }

  try {
    const order = await createOrderInDb(body);
    return NextResponse.json({
      orderId: order.id,
      orderNumber: order.order_number,
      paymentMethod: order.payment_method,
      paymentStatus: order.payment_status,
      total: order.total,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "No se pudo crear el pedido.";
    return NextResponse.json({ error: "create_failed", message }, { status: 500 });
  }
}
