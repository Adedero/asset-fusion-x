import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async (event) => {
  const { investmentId } = getRouterParams(event);

  const investment = await prisma.investment.findUnique({
    where: {
      id: investmentId
    },
    include: {
      investor: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true
            }
          }
        }
      },
      financialAccount: {
        select: {
          id: true,
          name: true,
          createdAt: true,
          type: true,
          ownership: true
        }
      },
      profits: true
    }
  });
  return investment;
});
