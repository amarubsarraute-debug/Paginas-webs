import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionValue } from "@/lib/auth";
import { updateOrderStatus } from "@/lib/data/orders";
import type { OrderStatus } from "@/types/db";

export const runtime = "nodejs";

const VALID: OrderStatus[] = [
  "new",
  "confirmed",
  "preparing",
  "ready",
  "delivered",
  "cancelled",
];

export async function POST(req: NextRequest) {
  const cookie = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!(await verifySessionValue(cookie))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let orderId: string | undefined;
  let status: OrderStatus | undefined;
  try {
    ({ orderId, status } = (await req.json()) as { orderId?: string; status?: OrderStatus });
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  if (!orderId || !status || !VALID.includes(status)) {
    return NextResponse.json({ error: "invalid_params" }, { status: 400 });
  }

  try {
    const order = await updateOrderStatus(orderId, status);
    return NextResponse.json({ ok: true, order });
  } catch (e) {
    const message = e instanceof Error ? e.message : "No se pudo actualizar.";
    return NextResponse.json({ error: "update_failed", message }, { status: 500 });
  }
}
