import { c as defineEventHandler, g as getRouterParams, p as prisma, e as createError, r as readValidatedBody, h as terminateInvestment } from '../../../../../../../_/nitro.mjs';
import z from 'zod';
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

const schema = z.object({
  terminatedReason: z.string("Invalid termination reason").nonempty("Reason is required.").trim()
});
const terminate_put = defineEventHandler(async (event) => {
  const { accountId, investmentId } = getRouterParams(event);
  const investment = await prisma.investment.findUnique({
    where: {
      id: investmentId,
      financialAccountId: accountId
    }
  });
  if (!investment) {
    throw createError({
      statusCode: 404,
      statusMessage: "Investment not found"
    });
  }
  const body = await readValidatedBody(event, schema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message
    });
  }
  await terminateInvestment(investmentId, {
    applyTerminationFee: true,
    terminatedReason: body.data.terminatedReason
  });
  return {
    message: "Investment terminated successfully."
  };
});

export { terminate_put as default };
//# sourceMappingURL=terminate.put.mjs.map
