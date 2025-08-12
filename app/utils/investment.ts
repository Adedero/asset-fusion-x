import type { BadgeProps } from "@nuxt/ui";

export const getInvestmentStatusBadgeColor = (status: string) => {
  const map: Record<string, BadgeProps["color"]> = {
    open: "success",
    closed: "primary",
    terminated: "error",
    paused: "warning",
  };

  return map[status];
};

export const getInvestmentStatusIcon = (status: string) => {
  const map: Record<string, string> = {
    open: "lucide-circle-check",
    closed: "lucide-circle-x",
    terminated: "lucide-info",
    paused: "lucide-circle-pause",
  };

  return map[status];
};
