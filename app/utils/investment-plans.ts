import type { BadgeProps } from "@nuxt/ui";

export const getInvestmentPlanCategoryBadgeColor = (
  investmentPlanCategory: string,
): BadgeProps["color"] => {
  switch (investmentPlanCategory) {
    case "forex":
      return "primary";
    case "stocks":
      return "success";
    case "real_estate":
      return "error";
    case "bonds":
      return "warning";
    case "derivatives":
      return "warning";
    case "cryptocurrencies":
      return "success";
    default:
      return "error";
  }
};
