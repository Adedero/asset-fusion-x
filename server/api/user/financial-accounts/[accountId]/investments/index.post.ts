import { notificationEmitter } from "~~/server/events/notifications/emitter";
import type { ProfitDistribution } from "~~/server/generated/prisma/enums";
import { prisma } from "~~/server/lib/prisma";
import { InvestmentSchema } from "~~/shared/zod";
import { checkUserKycApproval } from "~~/server/utils/accound-validation";

export default defineEventHandler(async (event) => {
  const user = event.context.user as EventContextUser;
  const accountId = getRouterParam(event, "accountId");

  const res = await checkUserKycApproval(user.id);

  if (!res.success) {
    throw createError(res.error);
  }

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

  const divider = getDivider(data.profitDistribution);
  if (data.duration % divider !== 0) {
    throw createError({
      statusCode: 400,
      statusMessage:
        "Duration must align with profit distribution cycle. This is a bug. Please contact support for help."
    });
  }

  const totalProfitCount: number = data.duration / divider;
  const distributionArray = getProfitDistributionCycleAmountArray({
    totalProfitCount,
    deposit: data.deposit,
    percentageReturn: data.totalReturn
  });

  const { investment, financialAccount } = await prisma.$transaction(
    async (tx) => {
      const inv = await tx.investment.create({ data });

      await tx.profit.createMany({
        data: distributionArray.map(({ number, amount }) => ({
          investmentId: inv.id,
          number,
          intendedAmount: amount,
          actualAmount: amount
        }))
      });

      const finAccount = await tx.financialAccount.update({
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
      });

      await tx.transaction.create({
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
          description: `Investment deposit for ${data.investmentName} (${data.category})`
        }
      });

      return {
        investment: inv,
        financialAccount: finAccount
      };
    }
  );

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

function getDivider(distribution: ProfitDistribution) {
  switch (distribution) {
    case "daily":
      return 1;
    case "weekly":
      return 7;
    case "bi_weekly":
      return 14;
    case "monthly":
      return 30;
  }
}

interface Options {
  totalProfitCount: number;
  deposit: number;
  percentageReturn: number;
}
function getProfitDistributionCycleAmountArray(
  options: Options
): { number: number; amount: number }[] {
  const { totalProfitCount, deposit, percentageReturn } = options;

  if (totalProfitCount <= 0) {
    throw new Error("totalProfitCount must be greater than 0");
  }

  const expectedReturn = round(deposit * (percentageReturn / 100), 2);

  // Generate random weights
  const randoms = Array.from({ length: totalProfitCount }, () => Math.random());

  const sumRandoms = randoms.reduce((acc, r) => acc + r, 0);

  // Scale them to match expectedReturn
  const results = randoms.map((r) =>
    round((r / sumRandoms) * expectedReturn, 2)
  );

  // Fix rounding errors so total = expectedReturn exactly
  const diff = round(expectedReturn - results.reduce((a, b) => a + b, 0), 2);

  if (diff !== 0) {
    // Add the difference to a random index to balance rounding
    const idx = Math.floor(Math.random() * results.length);
    results[idx] = round(results[idx] + diff, 2);
  }

  return results.map((amount, i) => ({
    number: i + 1,
    amount
  }));
}
