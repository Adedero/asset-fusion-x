import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async () => {
  const plans = await prisma.investmentPlan.findMany();
  return plans;
});
