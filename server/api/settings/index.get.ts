import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async () => {
  const settings = await prisma.settings.findFirst();

  if (!settings) {
    throw createError({
      statusCode: 404,
      statusMessage: "Settings not found.",
    });
  }
  return settings;
});
