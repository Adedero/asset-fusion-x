//import { PrismaPg } from "@prisma/adapter-pg";
//import { PrismaBetterSQLite3 } from "@prisma/adapter-better-sqlite3";
/* import path from "node:path";

const adapter = new PrismaBetterSQLite3({
  url: `file:${path.resolve("database/main.db")}`
}); */

import { PrismaClient } from "../generated/prisma/client";

//export const prisma = new PrismaClient({ adapter });
export const prisma = new PrismaClient();
