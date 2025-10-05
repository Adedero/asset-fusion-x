import { notificationEmitter } from "../events/notifications/emitter";
import type { Investment } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";

interface Options {
  applyTerminationFee?: boolean;
  terminatedReason?: string | null;
}

export default async function terminateInvestment(
  investmentId: string,
  options?: Options
) {
  options = options ?? {
    applyTerminationFee: true,
    terminatedReason: null
  };

  const investment = await prisma.investment.findUnique({
    where: {
      id: investmentId
    },
    include: {
      financialAccount: true,

      investor: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      }
    }
  });

  if (!investment) {
    throw createError({
      statusCode: 404,
      statusMessage: "Investment not found"
    });
  }

  if (investment.status === "terminated" || investment.status === "closed") {
    throw createError({
      statusCode: 400,
      statusMessage: `Investment already ${investment.status}`
    });
  }

  const terminationFee: number = round(
    options.applyTerminationFee ? investment.terminationFee : 0
  );

  const updatedBalance =
    round(investment.financialAccount.balance) +
    round(investment.totalProfit) -
    terminationFee;

  if (updatedBalance < 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "Insufficient funds to terminate investment"
    });
  }

  const investmentUpdates: Partial<Investment> = {
    status: "terminated",
    terminatedReason: options.terminatedReason,
    terminatedAt: new Date(),
    pausedAt: null,
    pausedReason: null,
    closedAt: null,
    closedReason: null
  };

  await prisma.$transaction([
    prisma.investment.update({
      where: { id: investment.id },
      data: investmentUpdates
    }),

    prisma.financialAccount.update({
      where: {
        id: investment.financialAccountId
      },
      data: {
        balance: updatedBalance
      }
    }),

    prisma.transaction.createMany({
      data: [
        {
          amount: terminationFee,
          USDAmount: terminationFee,
          rate: 1,
          charges: 0,
          financialAccountId: investment.financialAccountId,
          type: "withdrawal",
          investmentId: investment.id,
          status: "successfull",
          approvedAt: new Date(),
          description: `Termination fee for investment with ID: ${investment.id}, Name: ${investment.investmentName}, and Category: (${investment.category})`
        },
        {
          amount: investment.totalProfit,
          USDAmount: investment.totalProfit,
          rate: 1,
          charges: 0,
          financialAccountId: investment.financialAccountId,
          type: "investment",
          investmentId: investment.id,
          status: "successfull",
          approvedAt: new Date(),
          description: `Total profit for investment with ID: ${investment.id}, Name: ${investment.investmentName}, and Category: (${investment.category}) after termination`
        }
      ]
    }),

    prisma.notification.createMany({
      data: [
        {
          title: "Investment Termination Fee",
          body: `A termination fee of $${terminationFee.toLocaleString()} has been deducted from your account for the investment with ID: ${
            investment.id
          }, Name: ${investment.investmentName}, and Category: (${
            investment.category
          })`,
          userId: investment.investor.user.id,
          financialAccountId: investment.financialAccountId
        },
        {
          title: "Investment Profit",
          body: `The total profit of $${investment.totalProfit.toLocaleString()} has been added to your account for the investment with ID: ${
            investment.id
          }, Name: ${investment.investmentName}, and Category: (${
            investment.category
          }) after termination`,
          userId: investment.investor.user.id,
          financialAccountId: investment.financialAccountId
        }
      ]
    })
  ]);

  // Email and notification for investment status to terminated
  notificationEmitter.emit("investment-status:update", {
    user: investment.investor.user,
    data: {
      investment: { ...investment, ...investmentUpdates },
      account: investment.financialAccount
    }
  });
}
