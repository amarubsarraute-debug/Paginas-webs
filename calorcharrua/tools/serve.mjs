// Dev-only static server for local preview. No deps. Serves the calorcharrua folder.
// Soporta HTTP Range requests (necesario para que el navegador pueda hacer seek del video del hero).
import { createServer } from "node:http";
import { stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { fileURLToPath } from "node:url";
import { join, extname, dirname, normalize } from "node:path";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url))); // .../calorcharrua
const PORT = parseInt(process.argv[2], 10) || 8771;

const MIME = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8", ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml",
  ".ico": "image/x-icon", ".woff2": "font/woff2", ".txt": "text/plain; charset=utf-8",
  ".mp4": "video/mp4", ".webm": "video/webm",
};

createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(req.url.split("?")[0]);
    if (p === "/") p = "/index.html";
    let file = normalize(join(ROOT, p));
    if (!file.startsWith(ROOT)) { res.writeHead(403).end("Forbidden"); return; }
    let st = await stat(file);
    if (st.isDirectory()) { file = join(file, "index.html"); st = await stat(file); }
    const type = MIME[extname(file).toLowerCase()] || "application/octet-stream";
    const range = req.headers.range;
    if (range) {
      const m = /bytes=(\d*)-(\d*)/.exec(range);
      let start = m && m[1] ? parseInt(m[1], 10) : 0;
      let end = m && m[2] ? parseInt(m[2], 10) : st.size - 1;
      if (isNaN(start) || start < 0) start = 0;
      if (isNaN(end) || end >= st.size) end = st.size - 1;
      if (start > end) { res.writeHead(416, { "Content-Range": `bytes */${st.size}` }).end(); return; }
      res.writeHead(206, {
        "Content-Type": type, "Accept-Ranges": "bytes",
        "Content-Range": `bytes ${start}-${end}/${st.size}`,
        "Content-Length": end - start + 1, "Cache-Control": "no-cache",
      });
      createReadStream(file, { start, end }).pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Type": type, "Accept-Ranges": "bytes",
        "Content-Length": st.size, "Cache-Control": "no-cache",
      });
      createReadStream(file).pipe(res);
    }
  } catch {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" }).end("<h1>404</h1>");
  }
}).listen(PORT, () => console.log(`CalorCharrua preview on http://localhost:${PORT}/`));
