import z from 'zod';

const investmentPlanSchema = z.object({
  name: z.string("Invalid investment plan name").nonempty("Investment plan name is required"),
  category: z.enum(
    [
      "forex",
      "stocks",
      "real_estate",
      "bonds",
      "commodities",
      "cryptocurrencies",
      "derivatives"
    ],
    "Invalid category"
  ),
  minimumDeposit: z.number("Invalid minimum deposit").gt(0, "Minimum deposit must be greater than 0"),
  maximumDeposit: z.number("Invalid maximum deposit").gt(0, "Maximum deposit must be greater than 0"),
  duration: z.number("Invalid duration").gte(1, "Duration must be at least 1 day"),
  profitDistribution: z.enum(
    ["daily", "weekly", "bi_weekly", "monthly"],
    "Invalid profit distribution"
  ),
  percentageTotalReturn: z.number("Invalid total return percentage").gt(100, "Total return percentage must be greater than 100%"),
  percentagePeriodicReturn: z.number(),
  terminationFee: z.number("Invalid termination fee").gte(0, "Termination fee must be at least 0")
}).refine((data) => data.minimumDeposit <= data.maximumDeposit, {
  path: ["maximumDeposit"],
  error: "Maximum deposit must be greater than or equal to minimum deposit"
}).refine(
  (data) => {
    var _a;
    const divisorMap = {
      daily: 1,
      weekly: 7,
      bi_weekly: 14,
      monthly: 30
    };
    const divisor = (_a = divisorMap[data.profitDistribution]) != null ? _a : 1;
    return data.duration % divisor === 0;
  },
  {
    error: "Duration must align with profit distribution cycle",
    path: ["duration"]
    // show error on duration field
  }
);

export { investmentPlanSchema as i };
//# sourceMappingURL=investment-plan.mjs.map
