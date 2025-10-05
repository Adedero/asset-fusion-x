import { d as defineEventHandler, g as getRouterParams, r as readValidatedBody, c as createError, p as prisma } from '../../../../nitro/nitro.mjs';
import { c as currencySchema } from '../../../../_/currency.mjs';
import 'node:path';
import 'fs/promises';
import 'axios';
import 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:crypto';
import 'cron';
import 'node:process';
import 'node:url';
import '@prisma/client/runtime/library';
import 'nodemailer';
import 'dotenv';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'better-auth/plugins';
import '@iconify/utils';
import 'consola';
import 'zod';

const _currencyId__put = defineEventHandler(async (event) => {
  const { currencyId } = getRouterParams(event);
  const body = await readValidatedBody(event, currencySchema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message
    });
  }
  const { data } = body;
  const existingCurrency = await prisma.currency.findFirst({
    where: {
      AND: [{ symbol: data.symbol }, { NOT: { id: currencyId } }]
    }
  });
  if (existingCurrency) {
    throw createError({
      statusCode: 400,
      statusMessage: `A currency with this symbol: ${data.symbol} already exists`
    });
  }
  await prisma.currency.update({
    where: {
      id: currencyId
    },
    data
  });
  return {
    message: "Currency updated successfully"
  };
});

export { _currencyId__put as default };
//# sourceMappingURL=_currencyId_.put.mjs.map
