import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async () => {
  const [users, pendingTransactions, financialAccounts] = await Promise.all([
    prisma.user.count(),
    prisma.transaction.count({
      where: {
        status: "pending",
        jointAccountModRequests: { none: {} }
      }
    }),
    prisma.financialAccount.count()
  ]);

  return {
    users,
    pendingTransactions,
    financialAccounts
  };
});
