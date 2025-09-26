import { Decimal } from "decimal.js";
import {
  AccountStatus,
  InvestmentStatus,
  ProfitDistribution,
  TransactionStatus,
  TransactionType
} from "../generated/prisma/enums";
import { prisma } from "../lib/prisma";
import type { Investment } from "../generated/prisma/client";
import { notificationEmitter } from "../events/notifications/emitter";

export default async function distributeProfit() {
  const startOfToday = getStartOfTodayUTC();
  const now = new Date();

  try {
    const eligibleInvestments = await prisma.investment.findMany({
      where: {
        status: InvestmentStatus.open,
        createdAt: { lt: startOfToday },
        financialAccount: { status: AccountStatus.active }
      },

      include: {
        financialAccount: true,
        investor: {
          select: {
            user: true
          }
        }
      }
    });

    if (!eligibleInvestments.length) {
      return;
    }

    for (const investment of eligibleInvestments) {
      try {
        if (!isDistributionDue(investment)) {
          continue;
        }

        const deposit = new Decimal(investment.deposit);

        // Calculate expected totals
        const expectedTotalProfit = deposit
          .mul(investment.totalReturn)
          .div(100);
        const periodicProfit = deposit.mul(investment.periodicReturn).div(100);

        let payout: Decimal;

        const isLastCycle = investment.profitCount + 1 >= investment.duration;

        if (isLastCycle) {
          // Reconcile final payout

          const remainingProfit = expectedTotalProfit.minus(
            new Decimal(investment.totalProfit)
          );
          payout = remainingProfit.greaterThan(0)
            ? remainingProfit
            : new Decimal(0);
        } else {
          payout = periodicProfit;
        }

        // Ensure 2 decimal places (truncate or round policy)
        payout = payout.toDecimalPlaces(2, Decimal.ROUND_HALF_UP);

        const newTotalProfit = new Decimal(investment.totalProfit)
          .plus(payout)
          .toDecimalPlaces(2, Decimal.ROUND_HALF_UP);

        const newBalance = new Decimal(investment.financialAccount.balance)
          .plus(payout)
          .toDecimalPlaces(2, Decimal.ROUND_HALF_UP);

        const updates: Partial<Investment> = {
          totalProfit: newTotalProfit.toNumber(),
          profitCount: investment.profitCount + 1,
          lastProfitDistributedAt: now,
          daysCompleted: investment.daysCompleted + 1
        };

        if (isLastCycle) {
          updates.status = InvestmentStatus.closed;
          updates.closedAt = now;
          updates.closedReason = "Completed investment cycle";
          console.log(`Investment ${investment.id} closed after final payout.`);

          // emit investment closure
          notificationEmitter.emit("investment-status:update", {
            user: investment.investor.user,
            data: {
              investment: {
                ...investment,
                ...updates
              },
              account: investment.financialAccount
            }
          });
        }

        await prisma.$transaction([
          prisma.investment.update({
            where: { id: investment.id },
            data: updates
          }),
          prisma.financialAccount.update({
            where: { id: investment.financialAccountId },
            data: { balance: newBalance.toNumber() }
          }),
          prisma.transaction.create({
            data: {
              amount: payout.toNumber(),
              USDAmount: payout.toNumber(),
              type: TransactionType.profit,
              status: TransactionStatus.successfull,
              investmentId: investment.id,
              financialAccountId: investment.financialAccountId,
              initiatorAccountId: investment.investorId,
              description: `Profit distribution (${
                isLastCycle ? "final" : investment.profitDistribution
              }) for ${investment.investmentName}`,
              approvedAt: new Date()
            }
          }),
          prisma.notification.create({
            data: {
              title: "Profit Distribution",
              body: `You have received a profit distribution of $${payout
                .toDecimalPlaces(2)
                .toNumber()
                .toLocaleString()} on your investment ${
                investment.investmentName
              }`,
              financialAccountId: investment.financialAccountId,
              link: `/user/accounts/${investment.financialAccountId}/investments/${investment.id}`
            }
          })
        ]);

        console.log(
          `Distributed ${payout.toFixed(2)} profit for investment ${
            investment.id
          }`
        );
      } catch (error) {
        console.error(
          `Failed to process profit distribution for investment ${investment.id}:`,
          error
        );
      }
    }
  } catch (error) {
    console.error(
      "Error during profit distribution setup or initial fetch.",
      error
    );
  }
}

/**
 * Helper: Determine if distribution is due based on cycle.
 */
function isDistributionDue(investment: Investment): boolean {
  const now = new Date();
  const last = investment.lastProfitDistributedAt
    ? new Date(investment.lastProfitDistributedAt)
    : null;

  switch (investment.profitDistribution) {
    case ProfitDistribution.daily:
      return !last || daysBetween(last, now) >= 1;
    case ProfitDistribution.weekly:
      return !last || daysBetween(last, now) >= 7;
    case ProfitDistribution.bi_weekly:
      return !last || daysBetween(last, now) >= 14;
    case ProfitDistribution.monthly:
      return !last || monthsBetween(last, now) >= 1;
    default:
      return false;
  }
}

/**
 * Helpers: Date calculations
 */
function daysBetween(d1: Date, d2: Date): number {
  return Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
}

function monthsBetween(d1: Date, d2: Date): number {
  return (
    d2.getUTCFullYear() * 12 +
    d2.getUTCMonth() -
    (d1.getUTCFullYear() * 12 + d1.getUTCMonth())
  );
}

function getStartOfTodayUTC(): Date {
  const now = new Date();
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
}
