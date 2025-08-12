import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async (event) => {
  const { accountId, investmentId } = getRouterParams(event);

  const investment = await prisma.investment.findUniqueOrThrow({
    where: {
      id: investmentId,
      financialAccountId: accountId,
    },
    include: {
      investor: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
      transactions: {
        where: {
          type: "profit",
        },
        take: 1,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return {
    investment,
  };
});
