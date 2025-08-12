import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async () => {
  const currencies = await prisma.currency.findMany();

  return currencies;
});
