import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionValue } from "@/lib/auth";
import { createProduct } from "@/lib/data/admin";
import { defaultSlug } from "@/lib/data/catalog";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!(await verifySessionValue(req.cookies.get(ADMIN_COOKIE)?.value))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  let fields: Record<string, unknown> | undefined;
  let slug: string | undefined;
  try {
    ({ fields, slug } = (await req.json()) as { fields?: Record<string, unknown>; slug?: string });
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  if (!fields) {
    return NextResponse.json({ error: "invalid_params" }, { status: 400 });
  }
  try {
    const product = await createProduct(slug || defaultSlug(), fields);
    return NextResponse.json({ ok: true, product });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Error";
    return NextResponse.json({ error: "create_failed", message }, { status: 500 });
  }
}
