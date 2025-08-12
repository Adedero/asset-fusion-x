export function getModRequestStatusColor(
  status: string,
): "primary" | "success" | "error" {
  if (status === "pending") return "primary";
  else if (status === "accepted") return "success";
  else return "error";
}
