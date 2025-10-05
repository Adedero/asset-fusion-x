import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async (event) => {
  const { accountId, investmentId } = getRouterParams(event);

  const investment = await prisma.investment.findUniqueOrThrow({
    where: {
      id: investmentId,
      financialAccountId: accountId
    },
    include: {
      investor: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        }
      },
      profits: true,
      transactions: {
        where: {
          type: "profit",
        },
        select: {
          id: true,
          amount: true,
          USDAmount: true,
          status: true,
          createdAt: true,
          updatedAt: true
        },
        take: 1,
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  });

  return {
    investment
  };
});
