import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async (event) => {
  const user = event.context.user;

  // 1. Get all account IDs where user is a member
  const accountMemberships = await prisma.accountUser.findMany({
    where: { userId: user.id },
    select: { financialAccountId: true },
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
      notifications: [],
    };
  }

  // 2. Fetch all the data in parallel
  const [
    accounts,
    profitAgg,
    investmentCount,
    recentTransactions,
    notifications,
  ] = await Promise.all([
    prisma.financialAccount.findMany({
      where: { id: { in: accountIds }, status: "active" },
      select: { balance: true },
    }),

    prisma.investment.aggregate({
      where: { status: "open", financialAccountId: { in: accountIds } },
      _sum: { totalProfit: true },
    }),

    prisma.investment.count({
      where: { status: "open", financialAccountId: { in: accountIds } },
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
        createdAt: true,
      },
    }),

    prisma.notification.findMany({
      where: {
        OR: [{ userId: user.id }, { financialAccountId: { in: accountIds } }],
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  // 3. Compute total balance and return
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
    notifications,
  };
});
