import { prisma } from "~~/server/lib/prisma";
import { settingsSchema } from "~~/shared/schemas/settings";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, settingsSchema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message
    });
  }

  const { data } = body;

  await prisma.settings.updateMany({
    data
  });

  return {
    message: "Settings updated successfully"
  }
});
