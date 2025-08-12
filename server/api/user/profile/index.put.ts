import type { EventContextUser } from "~~/shared/types/user.types";
import { ProfileSchema } from "~~/shared/schemas";
import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async (event) => {
  const user = event.context.user as EventContextUser;

  const result = await readValidatedBody(event, ProfileSchema.safeParse);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.issues[0].message,
    });
  }

  const profile = await prisma.profile.upsert({
    create: {
      userId: user.id,
      ...result.data,
    },
    update: {
      ...result.data,
    },
    where: {
      userId: user.id,
    },
  });

  if (!profile) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update profile",
    });
  }

  return { profile };
});
