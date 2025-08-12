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

const index_put = defineEventHandler(async (event) => {
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
  const result = await prisma.notification.updateMany({
    where: {
      id: {
        in: notifications
      }
    },
    data: {
      isRead: true
    }
  });
  return {
    count: result.count
  };
});

export { index_put as default };
//# sourceMappingURL=index.put.mjs.map
