import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async (event) => {
  const { investmentId } = getRouterParams(event);

  await prisma.investment.delete({
    where: {
      id: investmentId
    }
  });

  return {
    message: "Investment deleted"
  };
});