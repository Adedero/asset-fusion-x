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

const index_get = defineEventHandler(async (event) => {
  const user = event.context.user;
  const joinRequests = await prisma.jointAccountRequest.findMany({
    where: {
      recipientEmail: user.email,
      financialAccount: {
        ownership: "joint",
        status: "active"
      }
    },
    include: {
      creator: {
        select: {
          name: true,
          email: true,
          image: true
        }
      },
      financialAccount: {
        select: {
          name: true,
          createdAt: true
        }
      }
    }
  });
  return joinRequests;
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
