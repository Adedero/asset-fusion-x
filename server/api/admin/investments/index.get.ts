import { prisma } from "~~/server/lib/prisma";
import { paginationQuerySchema } from "~~/shared/schemas";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  const schema = z.object({
    ...paginationQuerySchema.shape,
    status: z.enum(["open", "closed", "paused", "terminated"]).optional(),
    category: z
      .enum([
        "forex",
        "stocks",
        "real_estate",
        "bonds",
        "commodities",
        "cryptocurrencies",
        "derivatives"
      ])
      .optional(),
    distribution: z.enum(["daily", "weekly", "bi_weekly", "monthly"]).optional()
  });

  const query = await getValidatedQuery(event, schema.safeParse);

  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: query.error.issues[0].message
    });
  }
  const { status, category, distribution, page = 0, limit } = query.data;

  const investments = await prisma.investment.findMany({
    where: {
      AND: [
        category ? { category } : {},
        status ? { status } : {},
        distribution ? { profitDistribution: distribution } : {}
      ],
    },
    include: {
      investor: {
        select: {
          user: {
            select: {
              name: true,
              email: true
            }
          }
        }
      },
      financialAccount: {
        select: {
          name: true
        }
      }
    },
    skip: page * (limit ?? 0),
    take: limit,
    orderBy: {
      createdAt: "desc"
    }
  });

  return investments.map((inv) => ({
    ...inv,
    investorName: inv.investor.user.name,
    investorEmail: inv.investor.user.email,
    financialAccountName: inv.financialAccount.name,
    investor: undefined,
    financialAccount: undefined
  }));
});
