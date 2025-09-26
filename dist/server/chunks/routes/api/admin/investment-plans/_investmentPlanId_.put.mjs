import { d as defineEventHandler, g as getRouterParams, r as readValidatedBody, c as createError, p as prisma } from '../../../../nitro/nitro.mjs';
import { i as investmentPlanSchema } from '../../../../_/investment-plan.mjs';
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
import 'decimal.js';
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

const _investmentPlanId__put = defineEventHandler(async (event) => {
  const { investmentPlanId } = getRouterParams(event);
  const body = await readValidatedBody(event, investmentPlanSchema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message
    });
  }
  const { data } = body;
  const existingPlan = await prisma.investmentPlan.findFirst({
    where: {
      AND: [
        { category: data.category, name: data.name },
        { NOT: { id: investmentPlanId } }
      ]
    }
  });
  if (existingPlan) {
    throw createError({
      statusCode: 400,
      statusMessage: `An investment plan with the name ${data.name} already exists in the ${data.category} category`
    });
  }
  await prisma.investmentPlan.update({
    where: {
      id: investmentPlanId
    },
    data
  });
  return {
    message: "Investment plan updated successfully"
  };
});

export { _investmentPlanId__put as default };
//# sourceMappingURL=_investmentPlanId_.put.mjs.map
