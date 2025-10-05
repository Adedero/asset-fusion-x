import { d as defineEventHandler, r as readValidatedBody, c as createError, p as prisma } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
import 'node:path';
import 'fs/promises';
import 'axios';
import 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:crypto';
import 'cron';
import 'node:process';
import 'node:url';
import '@prisma/client/runtime/library';
import 'nodemailer';
import 'dotenv';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'better-auth/plugins';
import '@iconify/utils';
import 'consola';

const index_patch = defineEventHandler(async (event) => {
  const schema = z.object({
    notifications: z.array(z.string())
  });
  const body = await readValidatedBody(event, schema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message
    });
  }
  const { notifications } = body.data;
  const result = await prisma.notification.deleteMany({
    where: {
      id: {
        in: notifications
      }
    }
  });
  return {
    count: result.count
  };
});

export { index_patch as default };
//# sourceMappingURL=index.patch.mjs.map
