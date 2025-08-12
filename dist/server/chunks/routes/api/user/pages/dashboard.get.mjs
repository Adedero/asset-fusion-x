import { d as defineEventHandler, p as prisma } from '../../../../nitro/nitro.mjs';
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

const dashboard_get = defineEventHandler(async (event) => {
  const user = event.context.user;
  const accountMemberships = await prisma.accountUser.findMany({
    where: { userId: user.id },
    select: { financialAccountId: true }
  });
  const accountIds = accountMemberships.map((m) => m.financialAccountId);
  if (accountIds.length === 0) {
    return {
      activeAccounts: 0,
      totalBalance: 0,
      activeInvestments: 0,
      totalProfit: 0,
      lastTransaction: null,
      recentTransactions: [],
      notifications: []
    };
  }
  const [
    accounts,
    profitAgg,
    investmentCount,
    recentTransactions,
    notifications
  ] = await Promise.all([
    prisma.financialAccount.findMany({
      where: { id: { in: accountIds }, status: "active" },
      select: { balance: true }
    }),
    prisma.investment.aggregate({
      where: { status: "open", financialAccountId: { in: accountIds } },
      _sum: { totalProfit: true }
    }),
    prisma.investment.count({
      where: { status: "open", financialAccountId: { in: accountIds } }
    }),
    prisma.transaction.findMany({
      where: { financialAccountId: { in: accountIds } },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        USDAmount: true,
        type: true,
        status: true,
        currency: true,
        createdAt: true
      }
    }),
    prisma.notification.findMany({
      where: {
        OR: [{ userId: user.id }, { financialAccountId: { in: accountIds } }]
      },
      orderBy: { createdAt: "desc" },
      take: 10
    })
  ]);
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const totalProfit = profitAgg._sum.totalProfit || 0;
  const lastTransaction = recentTransactions[0] || null;
  return {
    activeAccounts: accounts.length,
    totalBalance,
    activeInvestments: investmentCount,
    totalProfit,
    lastTransaction,
    recentTransactions,
    notifications
  };
});

export { dashboard_get as default };
//# sourceMappingURL=dashboard.get.mjs.map
