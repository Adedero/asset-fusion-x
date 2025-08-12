import { d as defineEventHandler, p as prisma } from '../../../../../nitro/nitro.mjs';
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

const check_get = defineEventHandler(async (event) => {
  const user = event.context.user;
  const unreadNotification = await prisma.notification.findFirst({
    where: { userId: user.id, isRead: false },
    select: { id: true }
  });
  return { hasUnreadNotifications: !!unreadNotification };
});

export { check_get as default };
//# sourceMappingURL=check.get.mjs.map
