import { c as defineEventHandler, g as getRouterParams, r as readValidatedBody, e as createError, i as auth, p as prisma } from '../../../../../_/nitro.mjs';
import { a as BanUserSchema, b as banDurationToSeconds } from '../../../../../_/schemas.mjs';
import 'node:path';
import 'fs/promises';
import 'axios';
import 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'cron';
import 'node:process';
import 'node:url';
import '@prisma/client/runtime/library';
import 'nodemailer';
import 'dotenv';
import 'node:fs';
import '@better-auth/core/utils';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'better-auth/plugins';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'zod';

const ban_post = defineEventHandler(async (event) => {
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
    const expiresAt = banExpiresIn ? new Date(Date.now() + banExpiresIn * 1e3) : null;
    await prisma.bannedIp.upsert({
      where: { ipAddress },
      create: { ipAddress, reason, userId, expiresAt },
      update: { reason, userId, expiresAt }
    });
  }
  return { user };
});

export { ban_post as default };
//# sourceMappingURL=ban.post.mjs.map
