import { c as defineEventHandler, g as getRouterParams, f as getValidatedQuery, e as createError, p as prisma } from '../../../../../../../_/nitro.mjs';
import { p as paginationQuerySchema } from '../../../../../../../_/schemas.mjs';
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
const profits_get = defineEventHandler(async (event) => {
  const { investmentId, accountId } = getRouterParams(event);
  const query = await getValidatedQuery(event, paginationQuerySchema.safeParse);
  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: query.error.issues[0].message
    });
  }
  const { page = 1, limit = LIMIT } = query.data;
  const profits = await prisma.transaction.findMany({
    where: {
      financialAccountId: accountId,
      investmentId,
      type: "profit"
    },
    take: limit,
    skip: Math.max(page - 1, 0) * limit,
    orderBy: {
      createdAt: "desc"
    }
  });
  return profits;
});

export { profits_get as default };
//# sourceMappingURL=profits.get.mjs.map
