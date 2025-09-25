import { d as defineEventHandler, p as prisma } from '../../../nitro/nitro.mjs';
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

const index_get = defineEventHandler(async (event) => {
  const user = event.context.user;
  const profile = await prisma.profile.findUnique({
    where: { userId: user.id }
  });
  return { profile };
});

export { index_get as default };
//# sourceMappingURL=index.get4.mjs.map
