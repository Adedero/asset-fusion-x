const getInvestmentStatusBadgeColor = (status) => {
  const map = {
    open: "success",
    closed: "primary",
    terminated: "error",
    paused: "warning"
  };
  return map[status];
};
const getInvestmentStatusIcon = (status) => {
  const map = {
    open: "lucide-circle-check",
    closed: "lucide-circle-x",
    terminated: "lucide-info",
    paused: "lucide-circle-pause"
  };
  return map[status];
};

export { getInvestmentStatusIcon as a, getInvestmentStatusBadgeColor as g };
//# sourceMappingURL=investment-CJjcSFHl.mjs.map
