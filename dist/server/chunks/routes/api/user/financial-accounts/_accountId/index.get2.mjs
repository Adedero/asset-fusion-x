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

const index_get = defineEventHandler(async (event) => {
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
  const modRequests = await prisma.jointAccountModRequest.findMany({
    where: {
      financialAccountId: accountId
    },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          image: true
        }
      },
      approvals: {
        include: {
          approver: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        }
      },
      transaction: {
        select: {
          USDAmount: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  });
  const ownRequests = [];
  const otherRequests = [];
  modRequests.forEach((request) => {
    if (request.creator.id === user.id) {
      ownRequests.push(request);
    } else {
      otherRequests.push(request);
    }
  });
  return {
    allRequests: modRequests,
    ownRequests,
    otherRequests
  };
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
