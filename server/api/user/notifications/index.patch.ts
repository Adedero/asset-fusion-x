import { z } from "zod";
import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async (event) => {
  const schema = z.object({
    notifications: z.array(z.string()),
  });

  const body = await readValidatedBody(event, schema.safeParse);

  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message,
    });
  }

  const { notifications } = body.data;

  const result = await prisma.notification.deleteMany({
    where: {
      id: {
        in: notifications,
      },
    },
  });

  return {
    count: result.count,
  };
});
