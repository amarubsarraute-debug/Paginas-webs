// Construye un index.html autocontenido (CSS + JS inline) para que funcione 100% por file:// (doble clic).
// Fuentes modulares quedan como respaldo (index.src.html). Para reeditar: cambiar fuentes y re-correr este script.
import { readFile, writeFile, copyFile } from "node:fs/promises";

const css = await readFile("styles.css", "utf8");
const manifest = await readFile("lib/manifest.js", "utf8");
const main = await readFile("main.js", "utf8");

// Tomar SIEMPRE la versión modular como base (respaldo si existe, si no el index actual).
let base;
try { base = await readFile("index.src.html", "utf8"); }
catch { base = await readFile("index.html", "utf8"); await writeFile("index.src.html", base, "utf8"); }

let html = base;

// 1) Inline CSS — usar FUNCION replacer para que $$ / $& en el contenido no se interpreten.
html = html.replace(/<link rel="stylesheet" href="styles\.css(?:\?[^"]*)?">/,
  function () { return "<style>\n" + css + "\n</style>"; });

// 2) Inline JS — idem (main.js usa $ y $$, no deben mutarse).
html = html.replace(
  /<script defer src="lib\/manifest\.js(?:\?[^"]*)?"><\/script>\s*<script defer src="main\.js(?:\?[^"]*)?"><\/script>/,
  function () { return "<script>\n/* manifest */\n" + manifest + "\n/* main */\n" + main + "\n</script>"; }
);

await writeFile("index.html", html, "utf8");

const ok = !/href="styles\.css/.test(html) && !/src="main\.js/.test(html) && !/src="lib\/manifest\.js/.test(html);
console.log(ok ? "OK: index.html autocontenido generado (sin refs externas a css/js)." : "ATENCION: quedaron referencias externas, revisar selectores.");
console.log("Tamaño index.html:", html.length, "bytes");
