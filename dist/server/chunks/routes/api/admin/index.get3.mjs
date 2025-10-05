import { d as defineEventHandler, a as getValidatedQuery, c as createError, p as prisma } from '../../../nitro/nitro.mjs';
import { p as paginationQuerySchema } from '../../../_/schemas.mjs';
import { z } from 'zod';
import 'node:path';
import 'fs/promises';
import 'axios';
import 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:crypto';
import 'cron';
import 'node:process';
import 'node:url';
import '@prisma/client/runtime/library';
import 'nodemailer';
import 'dotenv';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'better-auth/plugins';
import '@iconify/utils';
import 'consola';

const index_get = defineEventHandler(async (event) => {
  const schema = z.object({
    ...paginationQuerySchema.shape,
    status: z.enum(["open", "closed", "paused", "terminated"]).optional(),
    category: z.enum([
      "forex",
      "stocks",
      "real_estate",
      "bonds",
      "commodities",
      "cryptocurrencies",
      "derivatives"
    ]).optional(),
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
      ]
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
    skip: page * (limit != null ? limit : 0),
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
    investor: void 0,
    financialAccount: void 0
  }));
});

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map
