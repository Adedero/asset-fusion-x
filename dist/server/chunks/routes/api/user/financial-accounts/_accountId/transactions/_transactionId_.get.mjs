import { c as defineEventHandler, g as getRouterParams, p as prisma, e as createError } from '../../../../../../_/nitro.mjs';
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

const _transactionId__get = defineEventHandler(async (event) => {
  const { accountId, transactionId } = getRouterParams(event);
  const transaction = await prisma.transaction.findUnique({
    where: {
      id: transactionId,
      financialAccountId: accountId
    },
    include: {
      initiator: {
        select: {
          user: {
            select: {
              name: true
            }
          }
        }
      }
    }
  });
  if (!transaction) {
    throw createError({
      statusCode: 404,
      statusText: "Transaction not found"
    });
  }
  return transaction;
});

export { _transactionId__get as default };
//# sourceMappingURL=_transactionId_.get.mjs.map
