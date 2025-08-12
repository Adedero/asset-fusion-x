import { d as defineEventHandler, f as getRouterParams, p as prisma, c as createError } from '../../../../../../nitro/nitro.mjs';
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
