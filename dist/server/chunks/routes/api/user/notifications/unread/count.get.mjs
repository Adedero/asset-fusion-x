import { o as eventHandler, p as prisma } from '../../../../../nitro/nitro.mjs';
import 'node:path';
import 'fs/promises';
import 'path';
import 'fs';
import 'winston';
import 'axios';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:crypto';
import 'node:url';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'node:process';
import '@prisma/client/runtime/library';
import 'better-auth/plugins';
import 'nodemailer';
import '@iconify/utils';
import 'consola';
import 'ipx';

const count_get = eventHandler(async (event) => {
  const user = event.context.user;
  const count = await prisma.notification.count({
    where: { userId: user.id, isRead: false }
  });
  return { count };
});

export { count_get as default };
//# sourceMappingURL=count.get.mjs.map
