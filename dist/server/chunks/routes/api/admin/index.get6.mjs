import { c as defineEventHandler, f as getValidatedQuery, e as createError, p as prisma } from '../../../_/nitro.mjs';
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
import 'cron';
import 'node:process';
import 'node:url';
import '@prisma/client/runtime/library';
import 'nodemailer';
import 'dotenv';
import 'node:fs';
import '@better-auth/core/utils';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'better-auth/plugins';
import '@iconify/utils';
import 'node:crypto';
import 'consola';

const index_get = defineEventHandler(async (event) => {
  var _a, _b;
  const schema = z.object({
    ...paginationQuerySchema.shape,
    type: z.enum(["deposit", "withdrawal", "transfer", "investment", "profit"]).optional(),
    status: z.enum(["pending", "successfull", "reversed", "failed"]).optional()
  });
  const query = await getValidatedQuery(event, schema.safeParse);
  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: (_b = (_a = query.error.issues[0]) == null ? void 0 : _a.message) != null ? _b : "Server error"
    });
  }
  const { type, status, page = 0, limit } = query.data;
  const transactions = await prisma.transaction.findMany({
    where: {
      AND: [type ? { type } : {}, status ? { status } : {}],
      jointAccountModRequests: { none: {} },
      parentTransactionId: null
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
      parentTransactionId: true,
      approvedAt: true,
      failedAt: true,
      failReason: true,
      depositWalletAddress: true,
      depositWalletAddressNetwork: true,
      withdrawalWalletAddress: true,
      withdrawalWalletAddressNetwork: true,
      bank: true,
      bankAccount: true,
      description: true,
      createdAt: true
    },
    skip: page * (limit != null ? limit : 0),
    take: limit,
    orderBy: {
      createdAt: "desc"
    }
  });
  return transactions.map((txn) => {
    var _a2, _b2, _c;
    return {
      ...txn,
      initiator: (_c = (_b2 = (_a2 = txn.initiator) == null ? void 0 : _a2.user) == null ? void 0 : _b2.name) != null ? _c : "system",
      financialAccountName: txn.financialAccount.name,
      financialAccount: void 0
    };
  });
});

export { index_get as default };
//# sourceMappingURL=index.get6.mjs.map
