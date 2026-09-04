import { c as defineEventHandler, p as prisma } from '../../../_/nitro.mjs';
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

const index_get = defineEventHandler(async () => {
  const bans = await prisma.bannedIp.findMany({
    orderBy: { createdAt: "desc" }
  });
  const userIds = [...new Set(bans.map((ban) => ban.userId).filter((id) => !!id))];
  const users = userIds.length ? await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, name: true, email: true }
  }) : [];
  const usersById = new Map(users.map((user) => [user.id, user]));
  return bans.map((ban) => {
    var _a;
    return {
      ...ban,
      user: ban.userId ? (_a = usersById.get(ban.userId)) != null ? _a : null : null
    };
  });
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
