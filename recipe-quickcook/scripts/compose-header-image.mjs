// Compose the Figma "Image" node (header dish illustration) into a single self-contained SVG.
// Each Figma asset is an individual SVG fragment positioned by percentage insets over an
// 88.378 x 59.201 box. We nest each fragment as <svg x/y/width/height> with its own viewBox.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const W = 88.378;
const H = 59.201;

const raw = await readFile(join(__dirname, "raw-header-image.txt"), "utf8");

// var -> url
const urls = {};
for (const m of raw.matchAll(/const (imgVector\d*) = "([^"]+)";/g)) {
  urls[m[1]] = m[2];
}

// ordered list of { inset:[t,r,b,l], var }
const frags = [];
for (const m of raw.matchAll(/inset-\[([\d.]+)%_([\d.]+)%_([\d.]+)%_([\d.]+)%\] (imgVector\d*)/g)) {
  frags.push({ t: +m[1], r: +m[2], b: +m[3], l: +m[4], v: m[5] });
}

console.log(`fragments: ${frags.length}, urls: ${Object.keys(urls).length}`);

const round = (n) => Math.round(n * 1000) / 1000;
const parts = [];

for (const f of frags) {
  const url = urls[f.v];
  if (!url) throw new Error(`no url for ${f.v}`);
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`\nskip ${f.v} -> ${res.status}`);
    continue;
  }
  const svg = await res.text();
  const vb = svg.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 1 1";
  // inner content = everything between the outer <svg ...> and </svg>
  const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").trim();
  const x = round((f.l / 100) * W);
  const y = round((f.t / 100) * H);
  const w = round(((100 - f.l - f.r) / 100) * W);
  const h = round(((100 - f.t - f.b) / 100) * H);
  parts.push(
    `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${vb}" preserveAspectRatio="none" overflow="visible">${inner}</svg>`
  );
  process.stdout.write(".");
}
console.log("\ncomposing...");

const out = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none">
${parts.join("\n")}
</svg>
`;

const assetsDir = join(__dirname, "..", "src", "assets");
await mkdir(assetsDir, { recursive: true });
await writeFile(join(assetsDir, "header-dish.svg"), out, "utf8");
console.log(`wrote src/assets/header-dish.svg (${out.length} bytes)`);
