import type { TransactionStatus } from "../generated/prisma/enums";
import { prisma } from "../lib/prisma";

export const reverseTransaction = async (
  financialAccountId: string,
  transactionId: string,
  status: TransactionStatus,
) => {
  const transaction = await prisma.transaction.findUniqueOrThrow({
    where: {
      id: transactionId,
      type: "withdrawal",
    },
  });

  const refundAmount = transaction.USDAmount + transaction.charges;

  await prisma.$transaction([
    prisma.financialAccount.update({
      where: {
        id: financialAccountId,
      },
      data: {
        balance: {
          increment: refundAmount,
        },
      },
    }),

    prisma.transaction.update({
      where: {
        id: transaction.id,
      },
      data: {
        status,
      },
    }),
  ]);
};
