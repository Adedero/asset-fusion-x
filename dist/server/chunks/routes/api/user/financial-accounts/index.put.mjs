import { d as defineEventHandler, f as getRouterParams, r as readValidatedBody, c as createError, p as prisma } from '../../../../nitro/nitro.mjs';
import { F as FinancialAccountSchema } from '../../../../_/index.mjs';
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
