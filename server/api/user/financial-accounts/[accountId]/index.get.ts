import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async (event) => {
  const user = event.context.user as { id: string };
  const accountId = getRouterParam(event, "accountId");

  if (!accountId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Account ID is required",
    });
  }

  // Authorization check — is the user part of the account?
  const isMember = await prisma.accountUser.findFirst({
    where: { userId: user.id, financialAccountId: accountId },
    select: { id: true },
  });

  if (!isMember) {
    throw createError({ statusCode: 403, statusMessage: "Access denied" });
  }

  // Fetch account, users, creator, and count
  const account = await prisma.financialAccount.findUnique({
    where: { id: accountId },
    include: {
      accountUsers: {
        include: {
          user: { select: { id: true, name: true, image: true } },
        },
        orderBy: { createdAt: "asc" },
        take: 5,
      },
      creator: { select: { name: true } },
      businessProfile: true,
      _count: { select: { accountUsers: true } },
    },
  });

  if (!account) {
    throw createError({ statusCode: 404, statusMessage: "Account not found" });
  }

  // Identify primary user (caller) and other users
  const users = account.accountUsers.map((au) => ({
    id: au.user.id,
    accountUserId: au.id,
    name: au.user.name,
    image: au.user.image ?? null,
  }));

  const primaryUser = users.find((u) => u.id === user.id) ?? null;
  const otherUsers = users.filter((u) => u.id !== user.id);

  // Fetch last transaction & last profit
  const [lastTransaction, lastProfit, activeInvestments] = await Promise.all([
    prisma.transaction.findFirst({
      where: { financialAccountId: account.id },
      orderBy: { createdAt: "desc" },
    }),

    prisma.transaction.findFirst({
      where: {
        type: "profit",
        financialAccountId: account.id,
        investment: { status: "open" },
      },
      orderBy: { createdAt: "desc" },
    }),

    prisma.investment.findMany({
      where: { financialAccountId: account.id, status: "open" },
      select: { totalProfit: true },
    }),
  ]);

  const totalProfit = activeInvestments.reduce(
    (sum, inv) => sum + inv.totalProfit,
    0,
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
    activeInvestmentCount: activeInvestments.length,
  };
});
