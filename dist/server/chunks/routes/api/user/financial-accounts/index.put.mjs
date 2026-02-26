import { c as defineEventHandler, g as getRouterParams, r as readValidatedBody, e as createError, p as prisma } from '../../../../_/nitro.mjs';
import { F as FinancialAccountSchema } from '../../../../_/index.mjs';
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
import 'zod';

const index_put = defineEventHandler(async (event) => {
  const { accountId } = getRouterParams(event);
  const { data, error, success } = await readValidatedBody(
    event,
    FinancialAccountSchema.partial().safeParse
  );
  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: error.issues[0].message
    });
  }
  const updated = await prisma.financialAccount.update({
    where: {
      id: accountId
    },
    data: {
      ...data
    }
  });
  return updated;
});

export { index_put as default };
//# sourceMappingURL=index.put.mjs.map
