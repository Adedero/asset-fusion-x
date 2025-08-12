import { d as defineEventHandler, f as getRouterParams, h as getValidatedQuery, c as createError, p as prisma } from '../../../../../nitro/nitro.mjs';
import { p as paginationQuerySchema } from '../../../../../_/schemas.mjs';
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

const LIMIT = parseInt(process.env.GET_REQUEST_LIMIT || "20");
const notifications_get = defineEventHandler(async (event) => {
  const { accountId } = getRouterParams(event);
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
      financialAccountId: accountId
    },
    take: limit,
    skip,
    orderBy: {
      createdAt: "desc"
    }
  });
  return notifications;
});

export { notifications_get as default };
//# sourceMappingURL=notifications.get.mjs.map
