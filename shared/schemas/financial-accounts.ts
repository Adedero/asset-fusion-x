import z from "zod";

export const financialAccountSchema = z.object({
  name: z
    .string({ message: "Invalid name" })
    .nonempty({ message: "Financial account name is required" }),
  balance: z.coerce
    .number({ message: "Invalid balance" })
    .min(0, { message: "Balance cannot be less than 0" })
});

export type FinancialAccountInput = z.infer<typeof financialAccountSchema>;
