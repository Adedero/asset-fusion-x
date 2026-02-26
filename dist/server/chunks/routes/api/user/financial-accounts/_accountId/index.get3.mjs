import { c as defineEventHandler, m as getRouterParam, f as getValidatedQuery, e as createError, p as prisma } from '../../../../../_/nitro.mjs';
import { p as paginationQuerySchema } from '../../../../../_/schemas.mjs';
import z from 'zod';
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
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'better-auth/plugins';
import '@iconify/utils';
import 'node:crypto';
import 'consola';

const LIMIT = parseInt(process.env.GET_REQUEST_LIMIT || "20");
const schema = z.object({
  ...paginationQuerySchema.shape,
  type: z.array(
    z.enum(["deposit", "withdrawal", "transfer", "investment", "profit"])
  ).optional(),
  status: z.array(z.enum(["pending", "successfull", "reversed", "failed"])).optional()
});
const index_get = defineEventHandler(async (event) => {
  var _a;
  const accountId = (_a = getRouterParam(event, "accountId")) != null ? _a : "";
  const query = await getValidatedQuery(event, schema.safeParse);
  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: query.error.issues[0].message
    });
  }
  const { type, status, page = 1, limit = LIMIT } = query.data;
  const transactions = await prisma.transaction.findMany({
    where: {
      AND: [
        type ? { type: { in: type } } : {},
        status ? { status: { in: status } } : {}
      ],
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
