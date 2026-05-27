/**
 * Regenerate room WebPs using the correct embedded layer (last image when stacked).
 */
import { execSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const imagesDir = path.join(root, "public", "images");
const gitRef = "e82341b";

const WEBP = { quality: 82, effort: 4 };
const DATA_URI_RE =
  /xlink:href="data:image\/(png|jpeg);base64,([^"]+)"/gi;

function readSvgFromGit(filename) {
  return execSync(`git show ${gitRef}:public/images/${filename}`, {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
}

function extractBestEmbeddedBuffer(svg) {
  const matches = [...svg.matchAll(DATA_URI_RE)];
  if (matches.length === 0) {
    throw new Error("No embedded image");
  }
  const pick = matches.length > 1 ? matches[matches.length - 1] : matches[0];
  return Buffer.from(pick[2], "base64");
}

async function writeWebp(buffer, outputPath, width) {
  await sharp(buffer)
    .resize({ width, withoutEnlargement: true })
    .webp(WEBP)
    .toFile(outputPath);
  const stat = await fs.stat(outputPath);
  console.log(
    path.basename(outputPath),
    `${(stat.size / 1024).toFixed(1)} KB`,
  );
}

const roomCards = [
  ["room-private.svg", "room-private-card.webp", 866],
  ["room-private-plus.svg", "room-private-plus-card.webp", 866],
  ["room-vip.svg", "room-vip-card.webp", 866],
  ["room-stream.svg", "room-stream-card.webp", 866],
  ["room-super-vip.svg", "room-super-vip-card.webp", 866],
];

for (const [src, dest, width] of roomCards) {
  const svg = readSvgFromGit(src);
  const buffer = extractBestEmbeddedBuffer(svg);
  await writeWebp(buffer, path.join(imagesDir, dest), width);
}

for (const [src, dest, width] of [
  ["room-private.svg", "room-private.webp", 1340],
  ["room-private-plus.svg", "room-private-plus.webp", 1340],
]) {
  const svg = readSvgFromGit(src);
  const buffer = extractBestEmbeddedBuffer(svg);
  await writeWebp(buffer, path.join(imagesDir, dest), width);
}

console.log("Room images regenerated.");
