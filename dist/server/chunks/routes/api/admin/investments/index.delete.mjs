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

const index_delete = defineEventHandler(async (event) => {
  const { investmentId } = getRouterParams(event);
  await prisma.investment.delete({
    where: {
      id: investmentId
    }
  });
  return {
    message: "Investment deleted"
  };
});

export { index_delete as default };
//# sourceMappingURL=index.delete.mjs.map
