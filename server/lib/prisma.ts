import { PrismaClient } from "~~/server/generated/prisma/client";
//import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaBetterSQLite3 } from "@prisma/adapter-better-sqlite3";
import path from "node:path";

const adapter = new PrismaBetterSQLite3({
  url: `file:${path.resolve("database/main.db")}`
});

export const prisma = new PrismaClient({ adapter });