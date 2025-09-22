import z from "zod";

export const currencySchema = z.object({
  name: z.string("Invalid currency name").min(1, "Currency name is required"),
  symbol: z
    .string("Invalid currency symbol")
    .min(1, "Currency symbol is required"),
  image: z.string("Invalid image URL").nullish(),
  rate: z.coerce.number("Invalid rate").min(0, "Rate must be a positive number"),
  walletAddress: z.string("Invalid wallet address").nullish(),
  walletAddressNetwork: z.string("Invalid wallet address network").nullish(),
  allowWithdrawal: z
    .boolean("Invalid allow withdrawal value")
    .default(true),
  withdrawalCharge: z
    .number("Invalid withdrawal charge")
    .min(0, "Withdrawal charge must be a positive number")
    .default(0)
});

export type CurrencyInput = z.infer<typeof currencySchema>;
