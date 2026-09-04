import { c as defineEventHandler, g as getRouterParams, i as auth, p as prisma } from '../../../../../_/nitro.mjs';
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

const unban_post = defineEventHandler(async (event) => {
  const { userId } = getRouterParams(event);
  await auth.api.unbanUser({
    body: { userId },
    headers: event.headers
  });
  await prisma.bannedIp.deleteMany({ where: { userId } });
  return { message: "User unbanned" };
});

export { unban_post as default };
//# sourceMappingURL=unban.post.mjs.map
