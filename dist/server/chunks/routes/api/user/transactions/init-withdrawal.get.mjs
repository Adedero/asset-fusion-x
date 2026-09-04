import { c as defineEventHandler, p as prisma, e as createError, f as getValidatedQuery, E as getUpdatedCurrencyData } from '../../../../_/nitro.mjs';
import { T as TransactionInitSchema } from '../../../../_/schemas.mjs';
import 'node:path';
import 'fs/promises';
import 'axios';
import 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'cron';
import 'node:process';
import 'node:url';
import '@prisma/client/runtime/library';
import 'nodemailer';
import 'dotenv';
import 'node:fs';
import '@better-auth/core/utils';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'better-auth/plugins';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'zod';

const initWithdrawal_get = defineEventHandler(async (event) => {
  const settings = await prisma.settings.findFirst();
  if (!settings || !settings.allowWithdrawals) {
    throw createError({
      statusCode: 500,
      statusMessage: "Withdrawals are not allowed at this time. Please, try again later."
    });
  }
  const query = await getValidatedQuery(event, TransactionInitSchema.safeParse);
  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: query.error.issues[0].message
    });
  }
  const { symbol, amount } = query.data;
  if (symbol === "WIRE") {
    throw createError({
      statusCode: 400,
      statusMessage: "Validation is not required for Wire Transfer withdrawals"
    });
  }
  const currency = await prisma.currency.findUnique({
    where: { symbol }
  });
  if (!currency) {
    throw createError({
      statusCode: 404,
      statusMessage: "Withdrawal currency not found"
    });
  }
  const updatedCurrency = await getUpdatedCurrencyData(currency);
  const currencyDepositAmount = amount / updatedCurrency.rate;
  return {
    request: {
      amount,
      symbol
    },
    currency: updatedCurrency,
    currencyDepositAmount
  };
});

export { initWithdrawal_get as default };
//# sourceMappingURL=init-withdrawal.get.mjs.map
