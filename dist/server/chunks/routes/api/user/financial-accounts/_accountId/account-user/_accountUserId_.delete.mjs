import { c as defineEventHandler, l as getRequestParam, p as prisma, e as createError } from '../../../../../../_/nitro.mjs';
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

const _accountUserId__delete = defineEventHandler(async (event) => {
  const user = event.context.user;
  const accountId = getRequestParam(event, "accountId");
  const accountUserId = getRequestParam(event, "accountUserId");
  const [financialAccount, accountUser] = await Promise.all([
    prisma.financialAccount.findUniqueOrThrow({
      where: {
        id: accountId
      }
    }),
    await prisma.accountUser.findUniqueOrThrow({
      where: {
        id: accountUserId,
        financialAccountId: accountId
      }
    })
  ]);
  if (financialAccount.creatorId !== user.id) {
    throw createError({
      statusCode: 403,
      statusMessage: "Not allowed"
    });
  }
  if (accountUser.userId === user.id) {
    throw createError({
      statusCode: 400,
      statusMessage: "You cannot remove yourself from an account. Ask the account cretaor to remove you."
    });
  }
  const deleted = await prisma.accountUser.delete({
    where: {
      id: accountUser.id,
      financialAccountId: financialAccount.id
    }
  });
  return deleted;
});

export { _accountUserId__delete as default };
//# sourceMappingURL=_accountUserId_.delete.mjs.map
