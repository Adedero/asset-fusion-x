import { prisma } from "~~/server/lib/prisma";
import { paginationQuerySchema } from "~~/shared/schemas";

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, paginationQuerySchema.safeParse);
  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: query.error.issues[0].message
    });
  }
  const { search = "", page = 0, limit, skip } = query.data;

  const accounts = await prisma.financialAccount.findMany({
    where: {
      OR: [
        { creator: { name: { contains: search, mode: "insensitive" } } },
        { creator: { email: { contains: search, mode: "insensitive" } } },
        { name: { contains: search, mode: "insensitive" } }
      ]
    },
    select: {
      id: true,
      name: true,
      status: true,
      type: true,
      balance: true,
      createdAt: true,
      ownership: true,
      creator: {
        select: {
          name: true,
          email: true
        }
      }
    },
    skip: skip ?? page * (limit ?? 0),
    take: limit,
    orderBy: {
      createdAt: "desc"
    }
  });

  return accounts;
});
