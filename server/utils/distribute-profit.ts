import {
  AccountStatus,
  InvestmentStatus,
  ProfitDistribution,
  TransactionStatus,
  TransactionType
} from "../generated/prisma/enums";
import { prisma } from "../lib/prisma";
import type { Investment, Profit } from "../generated/prisma/client";
import { notificationEmitter } from "../events/notifications/emitter";
import type { PrismaPromise } from "../generated/prisma/internal/prismaNamespace";

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
        },
        profits: true
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

        const nextProfit = investment.profits.find(
          (profit) => profit.number - investment.profitCount === 1
        );

        if (!nextProfit) {
          // or maybe do the manual calculation
          continue;
        }

        const payout = nextProfit.actualAmount;

        const newTotalProfit = investment.totalProfit + payout;

        const newBalance = round(
          investment.financialAccount.balance + newTotalProfit
        );

        /* const actualDaysCompleted = daysBetween(
          new Date(investment.createdAt),
          startOfToday
        ); */

        const actualDaysCompleted = Math.max(
          1,
          daysBetween(new Date(investment.createdAt), startOfToday)
        );

        const investmentUpdates: Partial<Investment> = {
          totalProfit: round(newTotalProfit),
          profitCount: investment.profitCount + 1,
          lastProfitDistributedAt: now,
          ...(actualDaysCompleted > investment.daysCompleted
            ? { daysCompleted: actualDaysCompleted }
            : undefined)
        };

        const profitUpdates: Partial<Profit> = {
          isDistributed: true,
          distributedAt: now
        };

        const isLastCycle =
          (investmentUpdates.daysCompleted ?? 0) + 1 >= investment.duration;

        if (isLastCycle) {
          investmentUpdates.status = InvestmentStatus.closed;
          investmentUpdates.closedAt = now;
          investmentUpdates.closedReason = "Investment cycle completed";
          //console.log(`Investment ${investment.id} closed after final payout.`);

          // emit investment closure
          notificationEmitter.emit("investment-status:update", {
            user: investment.investor.user,
            data: {
              investment: {
                ...investment,
                ...investmentUpdates
              },
              account: investment.financialAccount
            }
          });
        }

        const txs: PrismaPromise<unknown>[] = [
          prisma.investment.update({
            where: { id: investment.id },
            data: investmentUpdates
          }),
          prisma.profit.update({
            where: {
              id: nextProfit.id
            },
            data: profitUpdates
          }),
          prisma.transaction.create({
            data: {
              amount: payout,
              USDAmount: payout,
              type: TransactionType.profit,
              status: TransactionStatus.successfull,
              investmentId: investment.id,
              financialAccountId: investment.financialAccountId,
              initiatorAccountId: investment.investorId,
              description: `Profit distribution (${
                isLastCycle ? "final" : investment.profitDistribution
              }) for ${investment.investmentName}`,
              approvedAt: now
            }
          }),
          prisma.notification.create({
            data: {
              title: "Profit Distribution",
              body: `You have received a profit distribution of $${payout.toLocaleString()} on your investment ${
                investment.investmentName
              }`,
              financialAccountId: investment.financialAccountId,
              link: `/user/accounts/${investment.financialAccountId}/investments/${investment.id}`
            }
          })
        ];

        if (isLastCycle) {
          txs.push(
            prisma.financialAccount.update({
              where: { id: investment.financialAccountId },
              data: { balance: newBalance }
            })
          );
        }

        await prisma.$transaction(txs);
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
      return !last || daysBetween(last, now) >= 30;
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

/* function monthsBetween(d1: Date, d2: Date): number {
  return (
    d2.getUTCFullYear() * 12 +
    d2.getUTCMonth() -
    (d1.getUTCFullYear() * 12 + d1.getUTCMonth())
  );
}
 */
function getStartOfTodayUTC(): Date {
  const now = new Date();
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
}
