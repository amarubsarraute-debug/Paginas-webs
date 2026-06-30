import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionValue } from "@/lib/auth";
import { setTodaySpecial, clearAllTodaySpecials } from "@/lib/data/admin";
import { defaultSlug } from "@/lib/data/catalog";

export const runtime = "nodejs";

async function auth(req: NextRequest): Promise<boolean> {
  return verifySessionValue(req.cookies.get(ADMIN_COOKIE)?.value);
}

/** POST { productId, isToday } — activa/desactiva un producto en la pizarra */
export async function POST(req: NextRequest) {
  if (!(await auth(req))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  let productId: string | undefined;
  let isToday: boolean | undefined;
  try {
    ({ productId, isToday } = (await req.json()) as { productId?: string; isToday?: boolean });
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  if (!productId || typeof isToday !== "boolean") {
    return NextResponse.json({ error: "invalid_params" }, { status: 400 });
  }
  try {
    await setTodaySpecial(productId, isToday);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

/** DELETE — limpia todos los productos del día */
export async function DELETE(req: NextRequest) {
  if (!(await auth(req))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    await clearAllTodaySpecials(defaultSlug());
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
