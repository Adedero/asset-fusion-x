import { d as defineEventHandler, b as getRouterParam, h as getValidatedQuery, c as createError, p as prisma } from '../../../../../nitro/nitro.mjs';
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
const index_get = defineEventHandler(async (event) => {
  var _a;
  const accountId = (_a = getRouterParam(event, "accountId")) != null ? _a : "";
  const query = await getValidatedQuery(event, paginationQuerySchema.safeParse);
  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: query.error.issues[0].message
    });
  }
  const { page = 1, limit = LIMIT } = query.data;
  const transactions = await prisma.transaction.findMany({
    where: {
      financialAccountId: accountId
    },
    take: limit,
    skip: Math.max(page - 1, 0) * limit,
    orderBy: {
      createdAt: "desc"
    }
  });
  return transactions;
});

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map
