import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionValue } from "@/lib/auth";
import { updateProduct } from "@/lib/data/admin";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!(await verifySessionValue(req.cookies.get(ADMIN_COOKIE)?.value))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  let id: string | undefined;
  let fields: Record<string, unknown> | undefined;
  try {
    ({ id, fields } = (await req.json()) as { id?: string; fields?: Record<string, unknown> });
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  if (!id || !fields) {
    return NextResponse.json({ error: "invalid_params" }, { status: 400 });
  }
  try {
    const product = await updateProduct(id, fields);
    return NextResponse.json({ ok: true, product });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Error";
    return NextResponse.json({ error: "update_failed", message }, { status: 500 });
  }
}
