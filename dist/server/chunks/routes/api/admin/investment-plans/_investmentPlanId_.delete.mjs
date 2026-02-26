import { c as defineEventHandler, g as getRouterParams, p as prisma } from '../../../../_/nitro.mjs';
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
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'better-auth/plugins';
import '@iconify/utils';
import 'node:crypto';
import 'consola';

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
