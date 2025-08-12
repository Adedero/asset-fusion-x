import { d as defineEventHandler, r as readValidatedBody, c as createError, p as prisma } from '../../../nitro/nitro.mjs';
import { P as ProfileSchema } from '../../../_/schemas.mjs';
import 'node:path';
import 'fs/promises';
import 'path';
import 'fs';
import 'winston';
import 'axios';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:crypto';
import 'node:url';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'node:process';
import '@prisma/client/runtime/library';
import 'better-auth/plugins';
import 'nodemailer';
import '@iconify/utils';
import 'consola';
import 'ipx';
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
