import { c as defineEventHandler, r as readValidatedBody, e as createError, p as prisma } from '../../../_/nitro.mjs';
import { B as BannedIpSchema, b as banDurationToSeconds } from '../../../_/schemas.mjs';
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

const index_post = defineEventHandler(async (event) => {
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
  const expiresAt = banExpiresIn ? new Date(Date.now() + banExpiresIn * 1e3) : null;
  const ban = await prisma.bannedIp.create({
    data: { ipAddress, reason, expiresAt }
  });
  return ban;
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
