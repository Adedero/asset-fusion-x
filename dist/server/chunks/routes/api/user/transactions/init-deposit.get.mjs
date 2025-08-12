import { d as defineEventHandler, h as getValidatedQuery, c as createError, p as prisma, u as getUpdatedCurrencyData } from '../../../../nitro/nitro.mjs';
import { T as TransactionInitSchema } from '../../../../_/schemas.mjs';
import 'node:path';
import 'fs/promises';
import 'path';
import 'fs';
import 'winston';
import 'axios';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:crypto';
import 'node:url';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'node:process';
import '@prisma/client/runtime/library';
import 'better-auth/plugins';
import 'nodemailer';
import '@iconify/utils';
import 'consola';
import 'ipx';
import 'zod';

const initDeposit_get = defineEventHandler(async (event) => {
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
      statusMessage: "Validation is not required for Wire Transfer deposits"
    });
  }
  const currency = await prisma.currency.findUnique({
    where: { symbol }
  });
  if (!currency) {
    throw createError({
      statusCode: 404,
      statusMessage: "Deposit currency not found"
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

export { initDeposit_get as default };
//# sourceMappingURL=init-deposit.get.mjs.map
