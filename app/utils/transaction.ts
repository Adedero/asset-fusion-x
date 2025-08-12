export function getTransactionIcon(type: string): string {
  switch (type) {
    case "deposit":
      return "lucide-arrow-down-circle";
    case "withdrawal":
      return "lucide-arrow-up-circle";
    case "transfer":
      return "lucide-exchange";
    case "investment":
      return "lucide-coins";
    default:
      return "lucide-flower";
  }
}

export function getTransactionBadgeColor(type: string) {
  switch (type) {
    case "profit":
    case "deposit":
      return "success";
    case "withdrawal":
      return "error";
    default:
      return "primary";
  }
}

export function getTransactionStatusBadgeColor(status: string) {
  switch (status) {
    case "pending":
      return "primary";
    case "successfull":
      return "success";
    case "reversed":
      return "warning";
    default:
      return "error";
  }
}
