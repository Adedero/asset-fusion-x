import type { InvestmentPlan } from "../zod";

export default function getPercentagePeriodicReturn(
  plan: Pick<
    InvestmentPlan,
    "profitDistribution" | "duration" | "percentageTotalReturn"
  >
): number {
  const divisorMap = {
    daily: 1,
    weekly: 7,
    bi_weekly: 14,
    monthly: 30
  } as const;

  const divisor = divisorMap[plan.profitDistribution];

  // number of periods in the duration
  const periods = plan.duration / divisor;

  if (periods <= 0) return 0;

  // percentage per period
  return plan.percentageTotalReturn / periods;
}
