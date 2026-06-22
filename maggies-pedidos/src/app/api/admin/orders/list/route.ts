import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionValue } from "@/lib/auth";
import { listOrders } from "@/lib/data/orders";
import { defaultSlug } from "@/lib/data/catalog";

export const runtime = "nodejs";

/** Lista de pedidos para el panel (polling de auto-refresco). Protegida. */
export async function GET(req: NextRequest) {
  if (!(await verifySessionValue(req.cookies.get(ADMIN_COOKIE)?.value))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const orders = await listOrders(defaultSlug());
    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ orders: [] });
  }
}
