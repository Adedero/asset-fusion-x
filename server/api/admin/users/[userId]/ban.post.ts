import { auth } from "~~/server/lib/auth";
import { prisma } from "~~/server/lib/prisma";
import { BanUserSchema, banDurationToSeconds } from "~~/shared/schemas";

export default defineEventHandler(async (event) => {
  const { userId } = getRouterParams(event);
  const body = await readValidatedBody(event, BanUserSchema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message
    });
  }

  const { reason, duration, banIp, ipAddress } = body.data;
  const banExpiresIn = banDurationToSeconds[duration];

  const { user } = await auth.api.banUser({
    body: { userId, banReason: reason, banExpiresIn },
    headers: event.headers
  });

  if (banIp && ipAddress) {
    const expiresAt = banExpiresIn
      ? new Date(Date.now() + banExpiresIn * 1000)
      : null;

    await prisma.bannedIp.upsert({
      where: { ipAddress },
      create: { ipAddress, reason, userId, expiresAt },
      update: { reason, userId, expiresAt }
    });
  }

  return { user };
});
