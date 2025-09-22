import type { BadgeProps } from "@nuxt/ui";

export function getTxnStatusBadgeColor(status: string): BadgeProps["color"] {
  switch (status) {
    case "pending":
      return "primary";
    case "successfull":
      return "success";
    case "reversed":
      return "warning";
    case "failed":
      return "error";
    default:
      return "neutral";
  }
}

export function getTxnTypeBadgeColor(type: string): BadgeProps["color"] {
  switch (type) {
    case "profi":
    case "investment":
      return "success";
    case "withdrawal":
    case "transfer":
      return "error";
    case "deposit":
      return "primary";
    default:
      return "neutral";
  }
}
