import z from "zod";
import { notificationEmitter } from "~~/server/events/notifications/emitter";
import { prisma } from "~~/server/lib/prisma";

const schema = z.object({
  type: z.enum(["deposit", "withdrawal"]),
  status: z.enum(["successfull", "failed"], "Invalid transaction status"),
  approvedAt: z.coerce.date("Invalid failed at").nullish(),
  failReason: z.string("Invalid fail reason").nullish(),
  failedAt: z.coerce.date("Invalid failed at").nullish()
});

export default defineEventHandler(async (event) => {
  const { transactionId } = getRouterParams(event);
  const body = await readValidatedBody(event, schema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message
    });
  }

  const { type, status, approvedAt, failReason, failedAt } = body.data;

  const txn = await prisma.transaction.findUnique({
    where: {
      id: transactionId
    },
    include: {
      financialAccount: true,
      initiator: {
        select: {
          user: {
            select: {
              name: true,
              image: true,
              email: true,
              id: true
            }
          }
        }
      }
    }
  });

  if (!txn) {
    throw createError({
      statusCode: 404,
      statusMessage: "Transaction not found"
    });
  }

  if (txn.status !== "pending") {
    throw createError({
      statusCode: 400,
      statusMessage: "Transaction is not pending"
    });
  }

  if (type === "deposit") {
    if (status === "failed") {
      await prisma.transaction.update({
        where: {
          id: transactionId
        },
        data: {
          status,
          failedAt,
          failReason,
          approvedAt: null
        }
      });
    }

    if (status === "successfull") {
      await prisma.$transaction([
        prisma.transaction.update({
          where: {
            id: transactionId
          },
          data: {
            status,
            approvedAt,
            failedAt: null,
            failReason: null
          }
        }),
        prisma.financialAccount.update({
          where: {
            id: txn.financialAccountId
          },
          data: {
            balance: {
              increment: txn.USDAmount
            }
          }
        })
      ]);
    }
  }

  if (type === "withdrawal") {
    if (status === "successfull") {
      await prisma.transaction.update({
        where: {
          id: transactionId
        },
        data: {
          status,
          approvedAt,
          failedAt: null,
          failReason: null
        }
      });
    }

    const refundAmount = txn.USDAmount + txn.charges;

    if (status === "failed") {
      await prisma.$transaction([
        prisma.transaction.update({
          where: {
            id: transactionId
          },
          data: {
            status,
            failedAt,
            failReason,
            approvedAt: null
          }
        }),
        prisma.transaction.create({
          data: {
            type: "deposit",
            status: "successfull",
            amount: refundAmount,
            USDAmount: refundAmount,
            financialAccountId: txn.financialAccountId,
            parentTransactionId: txn.id,
            initiatorAccountId: txn.initiatorAccountId,
            description: `Refund for failed withdrawal with ID: ${txn.id}`
          }
        }),
        prisma.financialAccount.update({
          where: {
            id: txn.financialAccountId
          },
          data: {
            balance: {
              increment: refundAmount
            }
          }
        })
      ]);
    }
  }

  notificationEmitter.emit("transaction-status:update", {
    user: txn.initiator!.user,
    data: { transaction: { ...txn, status }, account: txn.financialAccount }
  });

  return {
    message: "Transaction status updated successfully"
  };
});
