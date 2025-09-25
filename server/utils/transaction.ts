import type { TransactionStatus } from "../generated/prisma/enums";
import { prisma } from "../lib/prisma";

export const reverseTransaction = async (
  financialAccountId: string,
  transactionId: string,
  status: TransactionStatus,
  failReason?: string
) => {
  const transaction = await prisma.transaction.findUniqueOrThrow({
    where: {
      id: transactionId,
      type: "withdrawal"
    }
  });

  const refundAmount = transaction.USDAmount + transaction.charges;

  const failedAt = status === "failed" ? new Date() : null;
  const reason = status === "failed" ? failReason : null;

  await prisma.$transaction([
    prisma.financialAccount.update({
      where: {
        id: financialAccountId
      },
      data: {
        balance: {
          increment: refundAmount
        }
      }
    }),

    prisma.transaction.update({
      where: {
        id: transaction.id
      },
      data: {
        status,
        failedAt,
        failReason: reason
      }
    })
  ]);
};
