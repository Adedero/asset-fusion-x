import { d as defineEventHandler, f as getRouterParam, c as createError, p as prisma } from '../../../../../nitro/nitro.mjs';
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
import 'node:process';
import 'node:url';
import '@prisma/client/runtime/library';
import 'nodemailer';
import 'dotenv';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'better-auth/plugins';
import '@iconify/utils';
import 'consola';

const joinRequests_get = defineEventHandler(async (event) => {
  const accountId = getRouterParam(event, "accountId");
  if (!accountId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Account ID is required"
    });
  }
  const user = event.context.user;
  const isAccountMember = await prisma.accountUser.findFirst({
    where: { userId: user.id, financialAccountId: accountId },
    select: { id: true }
  });
  if (!isAccountMember) {
    throw createError({
      statusCode: 403,
      statusMessage: "Not allowed"
    });
  }
  const joinRequests = await prisma.jointAccountRequest.findMany({
    where: { financialAccountId: accountId },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          image: true
        }
      },
      recipient: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
    }
  });
  return joinRequests;
});

export { joinRequests_get as default };
//# sourceMappingURL=join-requests.get.mjs.map
