import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Must match this folder — not C:\Users\Maxim (stray pnpm-lock.yaml there). */
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  outputFileTracingRoot: projectRoot,
};

export default nextConfig;
