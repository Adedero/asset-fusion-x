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

const _currencyId__delete = defineEventHandler(async (event) => {
  const { currencyId } = getRouterParams(event);
  await prisma.currency.delete({
    where: {
      id: currencyId
    }
  });
  return {
    message: "Currency deleted"
  };
});

export { _currencyId__delete as default };
//# sourceMappingURL=_currencyId_.delete.mjs.map
