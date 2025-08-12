import { notificationEmitter } from "~~/server/events/notifications/emitter";
import { prisma } from "~~/server/lib/prisma";
import { InvestmentSchema } from "~~/shared/zod";

export default defineEventHandler(async (event) => {
  const user = event.context.user as EventContextUser;
  const accountId = getRouterParam(event, "accountId");

  const { success, error, data } = await readValidatedBody(
    event,
    InvestmentSchema.safeParse,
  );

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: error.issues[0].message,
    });
  }

  if (accountId !== data.financialAccountId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Not allowed",
    });
  }

  const [investment, financialAccount] = await prisma.$transaction([
    prisma.investment.create({ data }),
    prisma.financialAccount.update({
      where: {
        id: data.financialAccountId,
      },
      data: {
        balance: {
          decrement: data.deposit,
        },
        totalInvestments: {
          increment: 1,
        },
      },
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
        approvedAt: new Date(),
        description: `Investment deposit for ${data.investmentName} (${data.category})`,
      },
    }),
  ]);

  notificationEmitter.emit("investment:create", {
    user,
    data: {
      investment,
      account: financialAccount,
    },
  });

  return {
    message: "Investment created",
    investment,
  };
});
