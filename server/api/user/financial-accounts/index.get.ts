import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async (event) => {
  const user = event.context.user as { id: string };

  const accountUsers = await prisma.accountUser.findMany({
    where: { userId: user.id },
    select: {
      financialAccount: {
        include: {
          accountUsers: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
            orderBy: { createdAt: "asc" },
            take: 5,
          },
          investments: {
            where: { status: "open" },
            select: { totalProfit: true },
          },
          _count: {
            select: {
              accountUsers: true,
            },
          },
        },
      },
    },
  });

  const financialAccounts = accountUsers.map(({ financialAccount }) => {
    const { accountUsers, _count, ...rest } = financialAccount;

    const primaryUserAccount = accountUsers.find(
      (au) => au.user.id === user.id,
    );

    const otherUsers = accountUsers
      .filter((au) => au.user.id !== user.id)
      .map((au) => ({
        id: au.user.id,
        name: au.user?.name ?? "",
        image: au.user?.image ?? null,
        accountUserId: au.id,
      }));

    return {
      ...rest,
      userCount: _count.accountUsers,
      primaryUser: primaryUserAccount
        ? {
            id: primaryUserAccount.user.id,
            name: primaryUserAccount.user.name,
            image: primaryUserAccount.user.image,
            accountUserId: primaryUserAccount.id,
          }
        : null,
      users: otherUsers,
      totalProfit: financialAccount.investments.reduce(
        (acc, inv) => (acc += inv.totalProfit),
        0,
      ),
    };
  });

  return { financialAccounts };
});
