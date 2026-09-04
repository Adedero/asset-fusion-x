import { c as defineEventHandler, g as getRouterParams, p as prisma } from '../../../../_/nitro.mjs';
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
  const { investmentId } = getRouterParams(event);
  const investment = await prisma.investment.findUnique({
    where: {
      id: investmentId
    },
    include: {
      investor: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true
            }
          }
        }
      },
      financialAccount: {
        select: {
          id: true,
          name: true,
          createdAt: true,
          type: true,
          ownership: true
        }
      },
      profits: true
    }
  });
  return investment;
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
