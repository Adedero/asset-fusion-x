import { c as defineEventHandler, p as prisma } from '../../_/nitro.mjs';
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

const index_get = defineEventHandler(async () => {
  var _a;
  const settings = (_a = await prisma.settings.findFirst()) != null ? _a : await prisma.settings.create({
    data: {
      allowWithdrawals: false
    }
  });
  return settings;
});

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map
