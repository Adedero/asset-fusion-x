import { d as defineEventHandler, g as getRouterParams, p as prisma } from '../../../../nitro/nitro.mjs';
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
import 'cron';
import 'decimal.js';
import 'fs';
import 'winston';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-pg';
import 'nodemailer';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'better-auth/plugins';
import '@iconify/utils';
import 'consola';
import 'ipx';

const _accountId__delete = defineEventHandler(async (event) => {
  const { accountId } = getRouterParams(event);
  await prisma.financialAccount.delete({
    where: {
      id: accountId
    }
  });
  return {
    message: "Financial account deleted"
  };
});

export { _accountId__delete as default };
//# sourceMappingURL=_accountId_.delete.mjs.map
