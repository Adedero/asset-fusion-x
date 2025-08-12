import { prisma } from "~~/server/lib/prisma";
import { TransactionInitSchema } from "~~/shared/schemas";

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, TransactionInitSchema.safeParse);

  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: query.error.issues[0].message,
    });
  }

  const { symbol, amount } = query.data;

  if (symbol === "WIRE") {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation is not required for Wire Transfer deposits",
    });
  }

  const currency = await prisma.currency.findUnique({
    where: { symbol },
  });

  if (!currency) {
    throw createError({
      statusCode: 404,
      statusMessage: "Deposit currency not found",
    });
  }

  const updatedCurrency = await getUpdatedCurrencyData(currency);

  const currencyDepositAmount = amount / updatedCurrency.rate;

  return {
    request: {
      amount,
      symbol,
    },
    currency: updatedCurrency,
    currencyDepositAmount,
  };
});
