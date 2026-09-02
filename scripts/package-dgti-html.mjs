import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const outputDir = path.join(root, "output", "dgti-html-preview");
const outputAssetsDir = path.join(outputDir, "assets");
const sourceAssetsDir = path.join(distDir, "assets");
const indexPath = path.join(distDir, "index.html");

if (!fs.existsSync(indexPath)) {
  throw new Error("dist/index.html not found. Run npm run build first.");
}

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });

let html = fs.readFileSync(indexPath, "utf8");
const cssLinks = [...html.matchAll(/<link rel="stylesheet" crossorigin href="\.\/(assets\/[^"]+\.css)">/g)];
const scriptTags = [...html.matchAll(/<script type="module" crossorigin src="\.\/(assets\/[^"]+\.js)"><\/script>/g)];

cssLinks.forEach((match) => {
  const css = fs.readFileSync(path.join(distDir, match[1]), "utf8");
  html = html.replace(match[0], () => `<style>\n${css}\n</style>`);
});

scriptTags.forEach((match) => {
  const js = fs.readFileSync(path.join(distDir, match[1]), "utf8").replaceAll("</script", "<\\/script");
  html = html.replace(match[0], () => `<script type="module">\n${js}\n</script>`);
});

fs.writeFileSync(path.join(outputDir, "index.html"), html);
fs.cpSync(path.join(sourceAssetsDir, "dgti"), path.join(outputAssetsDir, "dgti"), { recursive: true });

const faviconPath = path.join(distDir, "favicon.svg");
if (fs.existsSync(faviconPath)) {
  fs.copyFileSync(faviconPath, path.join(outputDir, "favicon.svg"));
}

console.log(`DGTI HTML preview package written to ${outputDir}`);
