import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async (event) => {
  const { accountId } = getRouterParams(event);
  await prisma.financialAccount.delete({
    where: {
      id: accountId
    }
  });

  return {
    message: "Financial account deleted"
  };
});
