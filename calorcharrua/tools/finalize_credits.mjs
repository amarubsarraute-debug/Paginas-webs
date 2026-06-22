// Dev-only. Rebuilds credits.json with attribution for the final image set.
import { writeFile } from "node:fs/promises";
const API = "https://api.openverse.org/v1/images/";
const SAFE = "cc0,by,by-sa,pdm";
const RENDERABLE = /\.(jpe?g|png|webp)(\?|$)/i;
const UA = "CalorCharrua-Site/1.0";

const MAP = [
  { id: "hero-fuego",       file: "assets/img/hero-fuego.jpg",       q: "log burner fire flames" },
  { id: "estufa-detalle",   file: "assets/img/estufa-detalle.jpg",   q: "cast iron stove fire glowing" },
  { id: "fogon",            file: "assets/img/fogon.jpg",            q: "fireplace burning logs dark" },
  { id: "taller-herreria",  file: "assets/img/taller-herreria.jpg",  q: "welding sparks workshop" },
  { id: "herreria-dragon",  file: "assets/img/herreria-dragon.jpg",  q: "blacksmith hands working iron" },
  { id: "lena",             file: "assets/img/lena.jpg",             q: "stacked firewood logs" },
  { id: "hierro-textura",   file: "assets/img/hierro-textura.jpg",   q: "rusted iron steel texture" },
];

async function meta(q) {
  const u = API + "?" + new URLSearchParams({ q, license: SAFE, mature: "false", page_size: "10" });
  try {
    const r = await fetch(u, { headers: { Accept: "application/json", "User-Agent": UA } });
    if (!r.ok) return null;
    const d = await r.json();
    const res = (d.results || []).find((x) => x.url && RENDERABLE.test(x.url));
    return res || null;
  } catch { return null; }
}

const credits = {};
for (const m of MAP) {
  const res = await meta(m.q);
  credits[m.id] = res ? {
    src: m.file, title: (res.title || "Sin título").slice(0, 120),
    creator: res.creator || "Desconocido", creator_url: res.creator_url || "",
    license: (res.license || "cc").toUpperCase(), license_version: res.license_version || "",
    license_url: res.license_url || "https://creativecommons.org/", source: res.source || "openverse",
  } : { src: m.file, title: "Imagen de ambiente", creator: "Openverse", creator_url: "",
        license: "CC", license_version: "", license_url: "https://openverse.org", source: "openverse" };
  console.log(`${m.id.padEnd(18)} ${credits[m.id].license.padEnd(8)} ${credits[m.id].creator}`);
}
await writeFile("assets/credits.json", JSON.stringify(credits, null, 2), "utf8");
console.log("credits.json written");
