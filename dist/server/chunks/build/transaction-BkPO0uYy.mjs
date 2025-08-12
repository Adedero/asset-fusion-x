function getTransactionIcon(type) {
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
function getTransactionBadgeColor(type) {
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
function getTransactionStatusBadgeColor(status) {
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

export { getTransactionBadgeColor as a, getTransactionStatusBadgeColor as b, getTransactionIcon as g };
//# sourceMappingURL=transaction-BkPO0uYy.mjs.map
