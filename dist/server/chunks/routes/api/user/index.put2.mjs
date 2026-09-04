import { c as defineEventHandler, r as readValidatedBody, e as createError, p as prisma } from '../../../_/nitro.mjs';
import { P as ProfileSchema } from '../../../_/schemas.mjs';
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

const index_put = defineEventHandler(async (event) => {
  const user = event.context.user;
  const result = await readValidatedBody(event, ProfileSchema.safeParse);
  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.issues[0].message
    });
  }
  const profile = await prisma.profile.upsert({
    create: {
      userId: user.id,
      ...result.data
    },
    update: {
      ...result.data
    },
    where: {
      userId: user.id
    }
  });
  if (!profile) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to update profile"
    });
  }
  return { profile };
});

export { index_put as default };
//# sourceMappingURL=index.put2.mjs.map
