import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { createApi } from "./api.js";

const root = resolve("dist");
const base = process.env.DGTI_BASE_PATH || "/dgti/";
const api = createApi();
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".webp": "image/webp", ".woff2": "font/woff2" };
const server = createServer((req, res) => api.handler(req, res, async () => {
  if (!["GET", "HEAD"].includes(req.method)) { res.writeHead(405); res.end(); return; }
  try {
    const path = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    if (path === base.slice(0, -1) || (path === "/" && base !== "/")) { res.writeHead(302, { Location: base }); res.end(); return; }
    if (!path.startsWith(base)) { res.writeHead(404); res.end(); return; }
    const target = resolve(root, path.slice(base.length) || "index.html");
    if (!target.startsWith(root + sep)) { res.writeHead(404); res.end(); return; }
    const info = await stat(target);
    if (!info.isFile()) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { "Content-Type": types[extname(target)] || "application/octet-stream", "Content-Length": info.size, "X-Content-Type-Options": "nosniff", "Cache-Control": "no-cache" });
    if (req.method === "HEAD") res.end();
    else createReadStream(target).on("error", () => res.destroy()).pipe(res);
  } catch { res.writeHead(404); res.end(); }
}));
server.requestTimeout = 15000;
server.headersTimeout = 10000;
server.listen(Number(process.env.PORT || 8787), process.env.HOST || "127.0.0.1", () => console.log(`DGTI: http://${process.env.HOST || "127.0.0.1"}:${process.env.PORT || 8787}${base}`));
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => server.close(() => { api.close(); process.exit(0); }));
