import { prisma } from "~~/server/lib/prisma";
import { paginationQuerySchema } from "~~/shared/schemas";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  const schema = z.object({
    ...paginationQuerySchema.shape,
    type: z
      .enum(["deposit", "withdrawal", "transfer", "investment", "profit"])
      .optional(),
    status: z.enum(["pending", "successfull", "reversed", "failed"]).optional()
  });

  const query = await getValidatedQuery(event, schema.safeParse);

  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: query.error.issues[0].message
    });
  }
  const { type, status, page = 0, limit } = query.data;

  const transactions = await prisma.transaction.findMany({
    where: {
      AND: [type ? { type } : {}, status ? { status } : {}],
      jointAccountModRequests: { none: {} }
    },
    select: {
      id: true,
      USDAmount: true,
      amount: true,
      currency: true,
      rate: true,
      charges: true,
      initiator: {
        select: {
          user: {
            select: {
              name: true
            }
          }
        }
      },
      financialAccount: {
        select: {
          name: true
        }
      },
      type: true,
      status: true,
      createdAt: true
    },
    skip: page * (limit ?? 0),
    take: limit,
    orderBy: {
      createdAt: "desc"
    }
  });

  return transactions.map((txn) => ({
    ...txn,
    initiator: txn.initiator.user.name,
    financialAccountName: txn.financialAccount.name,
    financialAccount: undefined
  }));
});
