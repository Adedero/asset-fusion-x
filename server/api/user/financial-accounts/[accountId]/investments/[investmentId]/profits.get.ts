import { prisma } from "~~/server/lib/prisma";
import { paginationQuerySchema } from "~~/shared/schemas";

const LIMIT = parseInt(process.env.GET_REQUEST_LIMIT || "20");

export default defineEventHandler(async (event) => {
  const { investmentId, accountId } = getRouterParams(event);

  const query = await getValidatedQuery(event, paginationQuerySchema.safeParse);

  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: query.error.issues[0].message,
    });
  }

  const { page = 1, limit = LIMIT } = query.data;

  const profits = await prisma.transaction.findMany({
    where: {
      financialAccountId: accountId,
      investmentId,
      type: "profit",
    },
    take: limit,
    skip: Math.max(page - 1, 0) * limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  return profits;
});
