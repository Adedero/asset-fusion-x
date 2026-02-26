import { c as defineEventHandler, g as getRouterParams, r as readValidatedBody, e as createError, p as prisma } from '../../../../_/nitro.mjs';
import { f as financialAccountSchema } from '../../../../_/financial-accounts.mjs';
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

const _accountId__put = defineEventHandler(async (event) => {
  const { accountId } = getRouterParams(event);
  const body = await readValidatedBody(event, financialAccountSchema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message
    });
  }
  const { data } = body;
  await prisma.financialAccount.update({
    where: {
      id: accountId
    },
    data
  });
  return {
    message: "Financial account updated successfully"
  };
});

export { _accountId__put as default };
//# sourceMappingURL=_accountId_.put.mjs.map
