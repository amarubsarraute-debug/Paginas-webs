import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, verifySessionValue } from "@/lib/auth";
import { getServiceClient } from "@/lib/supabase/server";
import { updateProduct } from "@/lib/data/admin";

export const runtime = "nodejs";

const BUCKET = "menu-fotos";

async function ensureBucket() {
  const sb = getServiceClient();
  const { data: buckets } = await sb.storage.listBuckets();
  if (!buckets?.some((b) => b.name === BUCKET)) {
    await sb.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: 5 * 1024 * 1024,
    });
  }
}

export async function POST(req: NextRequest) {
  if (!(await verifySessionValue(req.cookies.get(ADMIN_COOKIE)?.value))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "bad_form" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  const productId = formData.get("productId") as string | null;

  if (!file || !productId) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  try {
    await ensureBucket();

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const path = `${productId}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const sb = getServiceClient();
    const { error: uploadError } = await sb.storage
      .from(BUCKET)
      .upload(path, buffer, { contentType: file.type, upsert: true });

    if (uploadError) throw uploadError;

    const { data } = sb.storage.from(BUCKET).getPublicUrl(path);
    const url = `${data.publicUrl}?t=${Date.now()}`;

    await updateProduct(productId, { image_url: url });

    return NextResponse.json({ ok: true, url });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Error";
    return NextResponse.json({ error: "upload_failed", message }, { status: 500 });
  }
}
