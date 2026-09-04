import { prisma } from "~~/server/lib/prisma";
import { BannedIpSchema, banDurationToSeconds } from "~~/shared/schemas";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, BannedIpSchema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message
    });
  }

  const { ipAddress, reason, duration } = body.data;

  const existing = await prisma.bannedIp.findUnique({ where: { ipAddress } });
  if (existing) {
    throw createError({
      statusCode: 409,
      statusMessage: `${ipAddress} is already banned`
    });
  }

  const banExpiresIn = banDurationToSeconds[duration];
  const expiresAt = banExpiresIn
    ? new Date(Date.now() + banExpiresIn * 1000)
    : null;

  const ban = await prisma.bannedIp.create({
    data: { ipAddress, reason, expiresAt }
  });

  return ban;
});
