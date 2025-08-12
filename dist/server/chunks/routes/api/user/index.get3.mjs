import { d as defineEventHandler, h as getValidatedQuery, c as createError, p as prisma } from '../../../nitro/nitro.mjs';
import { p as paginationQuerySchema } from '../../../_/schemas.mjs';
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
import 'zod';

const LIMIT = parseInt(process.env.GET_REQUEST_LIMIT || "20");
const index_get = defineEventHandler(async (event) => {
  const user = event.context.user;
  const query = await getValidatedQuery(event, paginationQuerySchema.safeParse);
  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: query.error.issues[0].message
    });
  }
  const { skip = 0, limit = LIMIT } = query.data;
  const notifications = await prisma.notification.findMany({
    where: {
      userId: user.id
    },
    take: limit,
    skip,
    orderBy: {
      createdAt: "desc"
    }
  });
  return notifications;
});

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map
