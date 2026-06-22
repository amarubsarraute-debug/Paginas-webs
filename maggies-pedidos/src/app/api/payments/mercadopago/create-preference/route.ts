import { NextRequest, NextResponse } from "next/server";
import { getOrderById, setPreferenceId } from "@/lib/data/orders";
import { createMpPreference, getMpToken } from "@/lib/mercadopago";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let orderId: string | undefined;
  try {
    ({ orderId } = (await req.json()) as { orderId?: string });
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  if (!orderId) {
    return NextResponse.json({ error: "order_required" }, { status: 400 });
  }

  const token = getMpToken();
  if (!token) {
    return NextResponse.json(
      {
        error: "mp_not_configured",
        message: "Mercado Pago no está configurado. Elegí otro método de pago.",
      },
      { status: 503 }
    );
  }

  const order = await getOrderById(orderId);
  if (!order) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  try {
    const pref = await createMpPreference(token, order);
    await setPreferenceId(order.id, pref.id);
    return NextResponse.json({ preferenceId: pref.id, initPoint: pref.init_point });
  } catch (e) {
    const message = e instanceof Error ? e.message : "No se pudo iniciar el pago.";
    return NextResponse.json({ error: "preference_failed", message }, { status: 502 });
  }
}
