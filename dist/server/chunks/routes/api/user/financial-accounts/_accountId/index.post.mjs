import { d as defineEventHandler, b as getRouterParam, r as readValidatedBody, c as createError, p as prisma } from '../../../../../nitro/nitro.mjs';
import { n as notificationEmitter } from '../../../../../_/emitter.mjs';
import { I as InvestmentSchema } from '../../../../../_/index.mjs';
import 'node:path';
import 'fs/promises';
import 'path';
import 'fs';
import 'winston';
import 'axios';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:crypto';
import 'node:url';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'node:process';
import '@prisma/client/runtime/library';
import 'better-auth/plugins';
import 'nodemailer';
import '@iconify/utils';
import 'consola';
import 'ipx';
import 'zod';

const index_post = defineEventHandler(async (event) => {
  const user = event.context.user;
  const accountId = getRouterParam(event, "accountId");
  const { success, error, data } = await readValidatedBody(
    event,
    InvestmentSchema.safeParse
  );
  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: error.issues[0].message
    });
  }
  if (accountId !== data.financialAccountId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Not allowed"
    });
  }
  const [investment, financialAccount] = await prisma.$transaction([
    prisma.investment.create({ data }),
    prisma.financialAccount.update({
      where: {
        id: data.financialAccountId
      },
      data: {
        balance: {
          decrement: data.deposit
        },
        totalInvestments: {
          increment: 1
        }
      }
    }),
    prisma.transaction.create({
      data: {
        amount: data.deposit,
        currency: "USD",
        USDAmount: data.deposit,
        rate: 1,
        charges: 0,
        financialAccountId: data.financialAccountId,
        investmentId: data.id,
        type: "investment",
        initiatorAccountId: data.investorId,
        status: "successfull",
        approvedAt: /* @__PURE__ */ new Date(),
        description: `Investment deposit for ${data.investmentName} (${data.category})`
      }
    })
  ]);
  notificationEmitter.emit("investment:create", {
    user,
    data: {
      investment,
      account: financialAccount
    }
  });
  return {
    message: "Investment created",
    investment
  };
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
