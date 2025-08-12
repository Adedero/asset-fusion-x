import { d as defineEventHandler, b as getRouterParam, c as createError, p as prisma } from '../../../../nitro/nitro.mjs';
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

const index_get = defineEventHandler(async (event) => {
  var _a;
  const user = event.context.user;
  const accountId = getRouterParam(event, "accountId");
  if (!accountId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Account ID is required"
    });
  }
  const isMember = await prisma.accountUser.findFirst({
    where: { userId: user.id, financialAccountId: accountId },
    select: { id: true }
  });
  if (!isMember) {
    throw createError({ statusCode: 403, statusMessage: "Access denied" });
  }
  const account = await prisma.financialAccount.findUnique({
    where: { id: accountId },
    include: {
      accountUsers: {
        include: {
          user: { select: { id: true, name: true, image: true } }
        },
        orderBy: { createdAt: "asc" },
        take: 5
      },
      creator: { select: { name: true } },
      businessProfile: true,
      _count: { select: { accountUsers: true } }
    }
  });
  if (!account) {
    throw createError({ statusCode: 404, statusMessage: "Account not found" });
  }
  const users = account.accountUsers.map((au) => {
    var _a2;
    return {
      id: au.user.id,
      accountUserId: au.id,
      name: au.user.name,
      image: (_a2 = au.user.image) != null ? _a2 : null
    };
  });
  const primaryUser = (_a = users.find((u) => u.id === user.id)) != null ? _a : null;
  const otherUsers = users.filter((u) => u.id !== user.id);
  const [lastTransaction, lastProfit, activeInvestments] = await Promise.all([
    prisma.transaction.findFirst({
      where: { financialAccountId: account.id },
      orderBy: { createdAt: "desc" }
    }),
    prisma.transaction.findFirst({
      where: {
        type: "profit",
        financialAccountId: account.id,
        investment: { status: "open" }
      },
      orderBy: { createdAt: "desc" }
    }),
    prisma.investment.findMany({
      where: { financialAccountId: account.id, status: "open" },
      select: { totalProfit: true }
    })
  ]);
  const totalProfit = activeInvestments.reduce(
    (sum, inv) => sum + inv.totalProfit,
    0
  );
  const { accountUsers, _count, ...cleanAccount } = account;
  return {
    ...cleanAccount,
    userCount: _count.accountUsers,
    primaryUser,
    users: otherUsers,
    lastTransaction,
    lastProfit,
    totalProfit,
    activeInvestmentCount: activeInvestments.length
  };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
