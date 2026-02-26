// import { PrismaClient } from "../generated/prisma/client";

// export const prisma = new PrismaClient();

// server/lib/prisma.ts  (or wherever you want your app to import Prisma from)

import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

// Safely set __dirname before Prisma's generated file runs and tries to do it itself
globalThis['__dirname'] = (() => {
  try {
    return path.dirname(fileURLToPath(import.meta.url))
  } catch {
    return process.cwd()
  }
})();

// Now import from the generated file — globalThis.__dirname is already set,
// so when Prisma's generated code runs:
//   globalThis['__dirname'] = path.dirname(fileURLToPath(import.meta.url))
// it just overwrites with the same value (or if it throws, __dirname is already safe)
export * from '../generated/prisma/client'
export { PrismaClient, Prisma } from '../generated/prisma/client'