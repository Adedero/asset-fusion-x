import { d as defineEventHandler, g as getRouterParams, r as readValidatedBody, c as createError, p as prisma } from '../../../../nitro/nitro.mjs';
import z from 'zod';
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

const schema = z.object({
  actualAmount: z.number("Invalid actual amount")
});
const _profitId__put = defineEventHandler(async (event) => {
  const { profitId } = getRouterParams(event);
  const body = await readValidatedBody(event, schema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message
    });
  }
  const { actualAmount } = body.data;
  await prisma.profit.update({
    where: {
      id: profitId
    },
    data: {
      actualAmount
    }
  });
  return {
    message: "Profit updated"
  };
});

export { _profitId__put as default };
//# sourceMappingURL=_profitId_.put.mjs.map
