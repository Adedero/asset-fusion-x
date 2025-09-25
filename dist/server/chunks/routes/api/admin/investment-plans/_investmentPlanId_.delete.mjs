import { d as defineEventHandler, g as getRouterParams, p as prisma } from '../../../../nitro/nitro.mjs';
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
import 'fs';
import 'winston';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-pg';
import 'nodemailer';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'better-auth/plugins';
import '@iconify/utils';
import 'consola';
import 'ipx';

const _investmentPlanId__delete = defineEventHandler(async (event) => {
  const { investmentPlanId } = getRouterParams(event);
  await prisma.investmentPlan.delete({
    where: {
      id: investmentPlanId
    }
  });
  return {
    message: "Investment plan deleted"
  };
});

export { _investmentPlanId__delete as default };
//# sourceMappingURL=_investmentPlanId_.delete.mjs.map
