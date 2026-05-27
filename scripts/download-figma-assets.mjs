/**
 * Export images from Figma into public/images/
 *
 * Usage:
 *   npm run figma:assets              # skip files that already exist
 *   npm run figma:assets -- --force   # re-download everything
 *   npm run figma:assets -- --only room-private.jpg,room-vip.jpg
 *   npm run figma:assets:rooms       # only room photos + pattern
 *   npm run figma:assets -- --force  # replace files even if present
 *
 * Room photos: export as SVG from Figma into public/images/ as
 * room-private.svg, room-private-plus.svg, room-vip.svg, room-stream.svg,
 * room-super-vip.svg (see src/lib/assets.ts).
 *
 * Put your token in .env (project root):
 *   FIGMA_ACCESS_TOKEN=figd_...
 */

import "dotenv/config";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
process.chdir(rootDir);

const FILE_KEY = "q6ClDf9xVtv5C3oposKyPX";
const OUT_DIR = path.join(process.cwd(), "public", "images");

const BATCH_SIZE = 1;
const BATCH_DELAY_MS = 3500;
const MAX_RETRIES = 8;

/** Ignore empty/broken writes */
const MIN_BYTES_PRESENT = 100;

/** nodeId → { file, scale?, format? } — large frames use scale 1 */
const ASSETS = {
  "178:495": { file: "hero-bg.jpg", scale: 1, format: "jpg" },
  "178:506": { file: "hero-avulus.png", scale: 2 },
  "178:749": { file: "hero-247.png", scale: 2 },
  "178:500": { file: "hero-cyber.png", scale: 2 },
  "178:748": { file: "hero-hotel.png", scale: 2 },
  "178:509": { file: "hero-tagline.png", scale: 2 },
  "178:751": { file: "hero-restaurant-badge.png", scale: 2 },
  "178:712": { file: "feature-bar-bg.png", scale: 1 },
  "178:740": { file: "logo.png", scale: 2 },
  "178:714": { file: "icon-step-format.png", scale: 2 },
  "178:718": { file: "icon-step-room.png", scale: 2 },
  "178:724": { file: "icon-step-time.png", scale: 2 },
  "178:725": { file: "icon-step-play.png", scale: 2 },
  "178:731": { file: "icon-telegram.png", scale: 2 },
  "178:737": { file: "icon-phone.png", scale: 2 },
  "178:343": { file: "promo-hookah.jpg", scale: 1, format: "jpg" },
  "178:485": { file: "restaurant-food.jpg", scale: 1, format: "jpg" },
  "178:490": { file: "restaurant-drink.jpg", scale: 1, format: "jpg" },
  "178:323": { file: "map.jpg", scale: 1, format: "jpg" },
  "178:534": { file: "promo-1.jpg", scale: 1, format: "jpg" },
  "178:575": { file: "promo-2.jpg", scale: 1, format: "jpg" },
  "178:616": { file: "promo-3.jpg", scale: 1, format: "jpg" },
  "178:657": { file: "promo-4.jpg", scale: 1, format: "jpg" },
  "194:2035": { file: "hotel-gallery-main.jpg", scale: 1, format: "jpg" },
  "194:2036": { file: "hotel-gallery-1.jpg", scale: 1, format: "jpg" },
  "194:2037": { file: "hotel-gallery-2.jpg", scale: 1, format: "jpg" },
  "194:2038": { file: "hotel-gallery-3.jpg", scale: 1, format: "jpg" },
  "194:2039": { file: "hotel-gallery-4.jpg", scale: 1, format: "jpg" },
  "185:1206": { file: "hotel-map.jpg", scale: 1, format: "jpg" },
  "206:922": { file: "icon-check.png", scale: 2 },
  "178:333": { file: "rooms-section-pattern.png", scale: 1 },
  // Room photos are exported manually as SVG → public/images/room-*.svg
  "211:840": { file: "icon-monitor.png", scale: 2 },
  "211:834": { file: "icon-gpu.png", scale: 2 },
  "211:837": { file: "icon-cpu.png", scale: 2 },
  "178:407": { file: "formats-section-pattern.png", scale: 1 },
};

const ROOM_FILES = new Set(
  Object.values(ASSETS)
    .map((v) => (typeof v === "string" ? v : v.file))
    .filter((f) => f.startsWith("room") || f === "rooms-section-pattern.png"),
);

function parseArgs(argv) {
  const force = argv.includes("--force");
  const onlyIdx = argv.findIndex((a) => a === "--only");
  let only = null;
  if (onlyIdx !== -1 && argv[onlyIdx + 1]) {
    const raw = argv[onlyIdx + 1];
    only =
      raw === "rooms"
        ? ROOM_FILES
        : new Set(
            raw.split(",").map((s) => s.trim()).filter(Boolean),
          );
  }
  return { force, only };
}

const { force, only } = parseArgs(process.argv.slice(2));

const token = (
  process.env.FIGMA_ACCESS_TOKEN ?? process.env.FIGMA_TOKEN ?? ""
).trim();

if (!token) {
  console.error(
    "Missing FIGMA_ACCESS_TOKEN in .env\n\n  FIGMA_ACCESS_TOKEN=figd_...\n\nThen: npm run figma:assets",
  );
  process.exit(1);
}

function normalizeAsset(value) {
  if (typeof value === "string") {
    return { file: value, scale: 2, format: "png" };
  }
  return {
    file: value.file,
    scale: value.scale ?? 2,
    format: value.format ?? "png",
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function chunk(items, size) {
  const batches = [];
  for (let i = 0; i < items.length; i += size) {
    batches.push(items.slice(i, i + size));
  }
  return batches;
}

function retryAfterMs(res, attempt) {
  const header = res.headers.get("retry-after");
  if (header) {
    const seconds = Number.parseFloat(header);
    if (!Number.isNaN(seconds) && seconds > 0 && seconds <= 120) {
      return seconds * 1000;
    }
  }
  return Math.min(90_000, 15_000 * attempt);
}

async function fileShouldSkip(filename) {
  if (force) return false;
  try {
    const stat = await fs.stat(path.join(OUT_DIR, filename));
    return stat.size >= MIN_BYTES_PRESENT;
  } catch {
    return false;
  }
}

async function requestImageUrls(batch, attempt = 1) {
  const ids = batch.map(([nodeId]) => nodeId).join(",");
  const format = batch[0][1].format;
  const scale = batch[0][1].scale;
  const label = batch.map(([, m]) => m.file).join(", ");

  const apiUrl = `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&format=${format}&scale=${scale}`;

  const res = await fetch(apiUrl, { headers: { "X-Figma-Token": token } });
  const body = await res.json().catch(() => ({}));
  const message = body.err ?? body.message ?? res.statusText;

  if (!res.ok) {
    const isRateLimit = res.status === 429;
    const isTimeout =
      res.status === 400 && /timeout|fewer|smaller/i.test(String(message));

    if (attempt < MAX_RETRIES && (isRateLimit || isTimeout)) {
      const wait = isRateLimit ? retryAfterMs(res, attempt) : 5000 * attempt;
      console.warn(
        `${label}: ${res.status} (${message}). Waiting ${Math.round(wait / 1000)}s, retry ${attempt}/${MAX_RETRIES - 1}…`,
      );
      await sleep(wait);

      if (isTimeout && batch.length === 1 && scale > 1) {
        const fallback = [[batch[0][0], { ...batch[0][1], scale: 1 }]];
        return requestImageUrls(fallback, attempt + 1);
      }

      return requestImageUrls(batch, attempt + 1);
    }

    throw new Error(`Figma API error: ${res.status} ${message}`);
  }

  if (body.err) {
    throw new Error(`Figma export error: ${body.err}`);
  }

  return body.images ?? {};
}

/** One entry per output filename (last node id wins if duplicated) */
function buildExportList() {
  const byFile = new Map();
  for (const [nodeId, value] of Object.entries(ASSETS)) {
    const meta = normalizeAsset(value);
    if (only && !only.has(meta.file)) continue;
    byFile.set(meta.file, [nodeId, meta]);
  }
  return [...byFile.values()];
}

const allEntries = buildExportList();
await fs.mkdir(OUT_DIR, { recursive: true });

const skipped = [];
const toFetch = [];

for (const entry of allEntries) {
  const [, meta] = entry;
  if (await fileShouldSkip(meta.file)) {
    skipped.push(meta.file);
  } else {
    toFetch.push(entry);
  }
}

if (skipped.length > 0) {
  console.log(
    `Skipping ${skipped.length} existing file(s) (use --force to replace):\n  ${skipped.join("\n  ")}\n`,
  );
}

if (toFetch.length === 0) {
  console.log("Nothing to download. All targets already on disk.");
  process.exit(0);
}

const imageUrls = {};
const batches = chunk(toFetch, BATCH_SIZE);

console.log(`Exporting ${toFetch.length} asset(s) (${batches.length} Figma request(s))…\n`);

for (let i = 0; i < batches.length; i++) {
  const batch = batches[i];
  const label = batch[0][1].file;
  process.stdout.write(`[${i + 1}/${batches.length}] ${label}… `);
  const urls = await requestImageUrls(batch);
  Object.assign(imageUrls, urls);
  console.log("ok");
  if (i < batches.length - 1) await sleep(BATCH_DELAY_MS);
}

let ok = 0;
for (const [nodeId, meta] of toFetch) {
  const url = imageUrls[nodeId];
  if (!url) {
    console.warn(`No URL for ${nodeId} (${meta.file})`);
    continue;
  }
  const fileRes = await fetch(url);
  if (!fileRes.ok) {
    console.warn(`Download failed ${meta.file}: ${fileRes.status}`);
    continue;
  }
  await fs.writeFile(
    path.join(OUT_DIR, meta.file),
    Buffer.from(await fileRes.arrayBuffer()),
  );
  console.log(`  ✓ ${meta.file}`);
  ok++;
}

if (ok > 0) {
  const version = String(Date.now());
  await fs.writeFile(
    path.join(rootDir, "src", "lib", "asset-version.ts"),
    `/** Auto-generated by npm run figma:assets — do not edit */\nexport const ASSET_VERSION = "${version}";\n`,
  );
  console.log(`\nDone: ${ok} file(s) → public/images/ (cache v=${version})`);
} else {
  console.log("\nNo files were written.");
  process.exit(1);
}
