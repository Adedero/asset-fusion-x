import { prisma } from "~~/server/lib/prisma";
import { paginationQuerySchema } from "~~/shared/schemas";
import z from "zod";

const LIMIT = parseInt(process.env.GET_REQUEST_LIMIT || "20");

const schema = z.object({
  ...paginationQuerySchema.shape,
  type: z
    .array(
      z.enum(["deposit", "withdrawal", "transfer", "investment", "profit"])
    )
    .optional(),
  status: z
    .array(z.enum(["pending", "successfull", "reversed", "failed"]))
    .optional()
});

export default defineEventHandler(async (event) => {
  const accountId = getRouterParam(event, "accountId") ?? "";
 
  const query = await getValidatedQuery(event, schema.safeParse);

  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: query.error.issues[0].message
    });
  }

  const { type, status, page = 1, limit = LIMIT } = query.data;

  const transactions = await prisma.transaction.findMany({
    where: {
      AND: [
        type ? { type: { in: type } } : {},
        status ? { status: { in: status } } : {}
      ],
      financialAccountId: accountId
    },
    take: limit,
    skip: Math.max(page - 1, 0) * limit,
    orderBy: {
      createdAt: "desc"
    }
  });

  return transactions;
});
