// Dev-only. Fetches Creative-Commons atmosphere photos from Openverse (no API key).
// Node 18+ (native fetch). Run: node tools/fetch_images.mjs
import { writeFile, mkdir } from "node:fs/promises";

const API = "https://api.openverse.org/v1/images/";
const SAFE = "cc0,by,by-sa,pdm";
const RENDERABLE = /\.(jpe?g|png|webp)(\?|$)/i;
const UA = "CalorCharrua-Site/1.0 (static site build)";
const TARGET = "assets/img";
const MAX_BYTES = 5 * 1024 * 1024;

// Curated, warm, on-theme, replaceable. Several candidates per slot — we keep the first that downloads.
const SLOTS = [
  { id: "hero-fuego",   queries: ["wood burning stove fire flames", "cast iron stove burning", "forge fire glowing metal"], aspect: "wide" },
  { id: "fogon-asado",  queries: ["asado grill fire embers", "fire pit night flames", "barbecue coals fire"], aspect: "wide" },
  { id: "taller-herreria", queries: ["welding sparks workshop", "blacksmith forging metal", "metal workshop welder"], aspect: null },
  { id: "brasas",       queries: ["burning embers coals close up", "glowing charcoal embers"], aspect: "wide" },
  { id: "lena",         queries: ["stacked firewood logs", "chopped firewood pile"], aspect: null },
  { id: "hierro",       queries: ["rusted iron steel texture", "weathered metal plate dark"], aspect: "wide" },
  { id: "taller-manos", queries: ["blacksmith hands working iron", "metalworker grinding sparks"], aspect: "tall" },
];

async function search(q, aspect) {
  const variants = [
    { q, license: SAFE, aspect_ratio: aspect, size: "large", mature: "false", page_size: "8" },
    { q, license: SAFE, aspect_ratio: aspect, mature: "false", page_size: "8" },
    { q, license: SAFE, mature: "false", page_size: "8" },
  ];
  for (const v of variants) {
    const clean = Object.fromEntries(Object.entries(v).filter(([, val]) => val != null && val !== ""));
    const url = API + "?" + new URLSearchParams(clean);
    try {
      const r = await fetch(url, { headers: { Accept: "application/json", "User-Agent": UA } });
      if (!r.ok) continue;
      const data = await r.json();
      const results = (data.results || []).filter((x) => x.url && RENDERABLE.test(x.url));
      if (results.length) return results;
    } catch { /* try next variant */ }
  }
  return [];
}

async function download(url, destNoExt) {
  try {
    const r = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
    if (!r.ok) return null;
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length > MAX_BYTES || buf.length < 4000) return null;
    const m = RENDERABLE.exec(url);
    const ext = m ? "." + m[1].toLowerCase().replace("jpeg", "jpg") : ".jpg";
    const file = `${destNoExt}${ext}`;
    await writeFile(file, buf);
    return { file, bytes: buf.length, ext };
  } catch { return null; }
}

const credits = {};
await mkdir(TARGET, { recursive: true });

for (const slot of SLOTS) {
  let done = false;
  for (const q of slot.queries) {
    if (done) break;
    const results = await search(q, slot.aspect);
    for (const res of results) {
      const got = await download(res.url, `${TARGET}/${slot.id}`);
      if (got) {
        credits[slot.id] = {
          src: got.file.replace(/\\/g, "/"),
          title: (res.title || "Sin título").slice(0, 120),
          creator: res.creator || "Desconocido",
          creator_url: res.creator_url || "",
          license: (res.license || "cc").toUpperCase(),
          license_version: res.license_version || "",
          license_url: res.license_url || "https://creativecommons.org/",
          source: res.source || "openverse",
          query: q,
        };
        console.log(`OK  ${slot.id.padEnd(16)} ${(got.bytes/1024|0)}KB  "${q}"  ${got.ext}`);
        done = true;
        break;
      }
    }
  }
  if (!done) console.log(`MISS ${slot.id} — no usable result`);
}

await writeFile(`${TARGET}/../credits.json`, JSON.stringify(credits, null, 2), "utf8");
console.log(`\nDownloaded ${Object.keys(credits).length}/${SLOTS.length} slots. credits.json written.`);
