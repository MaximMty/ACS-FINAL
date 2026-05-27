/**
 * Rasterize oversized Figma SVGs to WebP at display resolution.
 * Figma SVGs embed JPEG/PNG as base64 — extract and resize with sharp.
 * Vector menu SVGs use @resvg/resvg-js.
 *
 * Run: npm run optimize-images
 * Requires source SVGs in public/images and public/menu (restore from git if re-running).
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const imagesDir = path.join(root, "public", "images");
const menuDir = path.join(root, "public", "menu");

const WEBP = { quality: 82, effort: 4 };

const DATA_URI_RE =
  /xlink:href="data:image\/(png|jpeg);base64,([^"]+)"/i;

/** Pick the topmost / room-specific embedded raster when Figma stacks layers. */
function extractBestEmbeddedBuffer(svg) {
  const matches = [...svg.matchAll(DATA_URI_RE)];
  if (matches.length > 0) {
    const pick = matches.length > 1 ? matches[matches.length - 1] : matches[0];
    return Buffer.from(pick[2], "base64");
  }
  return null;
}

/** @param {string} filePath */
async function rasterizeSvg(filePath, width) {
  const svg = await fs.readFile(filePath, "utf8");
  const embedded = extractBestEmbeddedBuffer(svg);
  if (embedded) {
    return embedded;
  }

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
  });
  return resvg.render().asPng();
}

/** @param {Buffer} input @param {string} outputPath @param {number} width */
async function writeWebp(input, outputPath, width) {
  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp(WEBP)
    .toFile(outputPath);

  const stat = await fs.stat(outputPath);
  const name = path.relative(root, outputPath);
  console.log(`  ${name} (${(stat.size / 1024).toFixed(1)} KB)`);
}

/** @param {string} input @param {string} output @param {number} width */
async function convertImage(input, output, width) {
  const inputPath = path.join(imagesDir, input);
  const outputPath = path.join(imagesDir, output);
  const buffer = await rasterizeSvg(inputPath, width);
  await writeWebp(buffer, outputPath, width);
}

/** @param {string} svgPath @param {number} width */
async function convertMenu(svgPath, width) {
  const webpPath = svgPath.replace(/\.svg$/i, ".webp");
  const buffer = await rasterizeSvg(svgPath, width);
  await writeWebp(buffer, webpPath, width);
}

async function walkMenu(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const svgs = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      svgs.push(...(await walkMenu(full)));
    } else if (entry.name.toLowerCase().endsWith(".svg")) {
      svgs.push(full);
    }
  }
  return svgs;
}

async function main() {
  console.log("Converting room cards (866px)...");
  const roomCards = [
    ["room-private.svg", "room-private-card.webp"],
    ["room-private-plus.svg", "room-private-plus-card.webp"],
    ["room-vip.svg", "room-vip-card.webp"],
    ["room-stream.svg", "room-stream-card.webp"],
    ["room-super-vip.svg", "room-super-vip-card.webp"],
  ];
  for (const [src, dest] of roomCards) {
    await convertImage(src, dest, 866);
  }

  console.log("Converting hotel room images (1340px)...");
  await convertImage("room-private.svg", "room-private.webp", 1340);
  await convertImage("room-private-plus.svg", "room-private-plus.webp", 1340);

  console.log("Converting restaurant images (1440px)...");
  await convertImage("burger.svg", "burger.webp", 1440);
  await convertImage("drink.svg", "drink.webp", 1440);

  console.log("Converting menu pages (1600px)...");
  const menuSvgs = await walkMenu(menuDir);
  menuSvgs.sort();
  for (const svgPath of menuSvgs) {
    await convertMenu(svgPath, 1600);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
