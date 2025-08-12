import type {
  InvestmentPlanCategoryType,
  ProfitDistributionType,
} from "../zod";

export const investmentPlanCategories: Array<{
  name: string;
  value: InvestmentPlanCategoryType;
}> = [
  { name: "Forex", value: "forex" },
  { name: "Real Estate", value: "real_estate" },
  { name: "Commodities", value: "commodities" },
  { name: "Stocks", value: "stocks" },
  { name: "Bonds", value: "bonds" },
  { name: "Cryptocurrencies", value: "cryptocurrencies" },
  { name: "Derivatives", value: "derivatives" },
];

export const profitDistribution: Array<{
  name: string;
  value: ProfitDistributionType;
}> = [
  { name: "Daily", value: "daily" },
  { name: "Weekly", value: "weekly" },
  { name: "Bi-weekly", value: "bi_weekly" },
  { name: "monthly", value: "monthly" },
];
