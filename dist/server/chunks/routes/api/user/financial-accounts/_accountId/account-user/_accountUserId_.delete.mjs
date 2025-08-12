import { d as defineEventHandler, g as getRequestParam, p as prisma, c as createError } from '../../../../../../nitro/nitro.mjs';
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
