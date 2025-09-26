import { o as eventHandler, p as prisma } from '../../../../../nitro/nitro.mjs';
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

const count_get = eventHandler(async (event) => {
  const user = event.context.user;
  const count = await prisma.notification.count({
    where: { userId: user.id, isRead: false }
  });
  return { count };
});

export { count_get as default };
//# sourceMappingURL=count.get.mjs.map
