// Dev-only. Grabs multiple candidates per slot so we can pick the best visually.
import { writeFile, mkdir } from "node:fs/promises";
const API = "https://api.openverse.org/v1/images/";
const SAFE = "cc0,by,by-sa,pdm";
const RENDERABLE = /\.(jpe?g|png|webp)(\?|$)/i;
const UA = "CalorCharrua-Site/1.0";
const TARGET = "assets/img/cand";
const MAX_BYTES = 6 * 1024 * 1024;

const SLOTS = [
  { id: "hero", queries: ["lit wood burning stove dark room", "log burner fire flames", "cast iron stove fire glowing", "fireplace burning logs dark", "blacksmith forge fire dark"], aspect: "wide", n: 5 },
  { id: "fogon", queries: ["bonfire flames night dark", "campfire fire pit night", "fire pit flames backyard", "large fire embers night"], aspect: "wide", n: 4 },
  { id: "brasas", queries: ["glowing embers charcoal red", "burning coals close up", "ember fire texture dark"], aspect: "wide", n: 3 },
];

async function search(q, aspect) {
  const variants = [
    { q, license: SAFE, aspect_ratio: aspect, size: "large", mature: "false", page_size: "10" },
    { q, license: SAFE, mature: "false", page_size: "10" },
  ];
  for (const v of variants) {
    const clean = Object.fromEntries(Object.entries(v).filter(([, x]) => x != null && x !== ""));
    try {
      const r = await fetch(API + "?" + new URLSearchParams(clean), { headers: { Accept: "application/json", "User-Agent": UA } });
      if (!r.ok) continue;
      const d = await r.json();
      const res = (d.results || []).filter((x) => x.url && RENDERABLE.test(x.url));
      if (res.length) return res;
    } catch {}
  }
  return [];
}
async function dl(url, dest) {
  try {
    const r = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
    if (!r.ok) return null;
    const b = Buffer.from(await r.arrayBuffer());
    if (b.length > MAX_BYTES || b.length < 4000) return null;
    const m = RENDERABLE.exec(url); const ext = m ? "." + m[1].toLowerCase().replace("jpeg", "jpg") : ".jpg";
    await writeFile(`${dest}${ext}`, b); return { ext, bytes: b.length };
  } catch { return null; }
}

await mkdir(TARGET, { recursive: true });
for (const s of SLOTS) {
  let count = 0; const seen = new Set();
  for (const q of s.queries) {
    if (count >= s.n) break;
    const res = await search(q, s.aspect);
    for (const r of res) {
      if (count >= s.n) break;
      if (seen.has(r.url)) continue; seen.add(r.url);
      const got = await dl(r.url, `${TARGET}/${s.id}-${count + 1}`);
      if (got) { console.log(`OK ${s.id}-${count + 1} ${(got.bytes/1024|0)}KB "${q}"`); count++; }
    }
  }
  if (!count) console.log(`MISS ${s.id}`);
}
console.log("done");
