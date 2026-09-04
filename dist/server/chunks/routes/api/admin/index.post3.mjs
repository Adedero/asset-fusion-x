import { c as defineEventHandler, r as readValidatedBody, e as createError, p as prisma } from '../../../_/nitro.mjs';
import { i as investmentPlanSchema } from '../../../_/investment-plan.mjs';
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

const index_post = defineEventHandler(async (event) => {
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
      category: data.category,
      name: data.name
    },
    select: {
      id: true
    }
  });
  if (existingPlan) {
    throw createError({
      statusCode: 400,
      statusMessage: `An investment plan with the name ${data.name} already exists in the ${data.category} category`
    });
  }
  await prisma.investmentPlan.create({
    data
  });
  return {
    message: "Investment plan created"
  };
});

export { index_post as default };
//# sourceMappingURL=index.post3.mjs.map
