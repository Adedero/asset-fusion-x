import z from 'zod';

const currencySchema = z.object({
  name: z.string("Invalid currency name").min(1, "Currency name is required"),
  symbol: z.string("Invalid currency symbol").min(1, "Currency symbol is required"),
  image: z.string("Invalid image URL").nullish(),
  rate: z.coerce.number("Invalid rate").min(0, "Rate must be a positive number"),
  walletAddress: z.string("Invalid wallet address").nullish(),
  walletAddressNetwork: z.string("Invalid wallet address network").nullish(),
  wireTransferDepositBankName: z.string("Invalid wire deposit bank name").nullish(),
  wireTransferDepositBankAccountNumber: z.string("Invalid wire deposit bank account number").nullish(),
  allowWithdrawal: z.boolean("Invalid allow withdrawal value").default(false),
  allowDeposit: z.boolean("Invalid allow deposit value").default(true),
  automaticallyUpdateRate: z.boolean("Invalid automatically update rate value").default(true),
  withdrawalCharge: z.coerce.number("Invalid withdrawal charge").min(0, "Withdrawal charge must be a positive number").default(0)
});

export { currencySchema as c };
//# sourceMappingURL=currency.mjs.map
