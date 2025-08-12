export const getAccountStatusBadgeColor = (status: string) => {
  if (status === "active") return "success";
  if (status === "dormant") return "warning";
  if (status === "cloded") return "error";
  return "primary";
};
