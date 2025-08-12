import { d as defineEventHandler, f as getRouterParams, p as prisma } from '../../../../../../nitro/nitro.mjs';
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

const index_get = defineEventHandler(async (event) => {
  const { accountId, investmentId } = getRouterParams(event);
  const investment = await prisma.investment.findUniqueOrThrow({
    where: {
      id: investmentId,
      financialAccountId: accountId
    },
    include: {
      investor: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        }
      },
      transactions: {
        where: {
          type: "profit"
        },
        take: 1,
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  });
  return {
    investment
  };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
