import type { BadgeProps } from "@nuxt/ui";
import type { KycStatus } from "~~/server/generated/prisma/enums";

export default function getKycStatusBadgeColor(
  status: KycStatus | null
): BadgeProps["color"] {
  switch (status) {
    case "pending":
      return "primary";
    case "verified":
      return "success";
    case "rejected":
      return "error";
    case "resubmit":
      return "warning";
    case null:
    default:
      return "neutral";
  }
}
