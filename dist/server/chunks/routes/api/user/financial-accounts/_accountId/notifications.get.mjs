import { c as defineEventHandler, g as getRouterParams, f as getValidatedQuery, e as createError, p as prisma } from '../../../../../_/nitro.mjs';
import { p as paginationQuerySchema } from '../../../../../_/schemas.mjs';
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
