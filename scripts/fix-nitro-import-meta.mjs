import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";

const entry = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "dist",
  "server",
  "index.mjs"
);

globalThis._importMeta_ = { url: pathToFileURL(entry).href, env: process.env };
