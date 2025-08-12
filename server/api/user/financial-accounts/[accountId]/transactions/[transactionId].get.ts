import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async (event) => {
  const { accountId, transactionId } = getRouterParams(event);

  const transaction = await prisma.transaction.findUnique({
    where: {
      id: transactionId,
      financialAccountId: accountId,
    },
    include: {
      initiator: {
        select: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!transaction) {
    throw createError({
      statusCode: 404,
      statusText: "Transaction not found",
    });
  }

  return transaction;
});
