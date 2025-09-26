import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async () => {
  const settings =
    (await prisma.settings.findFirst()) ??
    (await prisma.settings.create({
      data: {
        allowWithdrawals: false
      }
    }));

  return settings;
});
