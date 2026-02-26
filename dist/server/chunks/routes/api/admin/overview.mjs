import { c as defineEventHandler, p as prisma } from '../../../_/nitro.mjs';
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

const overview = defineEventHandler(async () => {
  const [users, pendingTransactions, financialAccounts] = await Promise.all([
    prisma.user.count(),
    prisma.transaction.count({
      where: {
        status: "pending",
        jointAccountModRequests: { none: {} }
      }
    }),
    prisma.financialAccount.count()
  ]);
  return {
    users,
    pendingTransactions,
    financialAccounts
  };
});

export { overview as default };
//# sourceMappingURL=overview.mjs.map
