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
  const user = event.context.user;
  const accountUsers = await prisma.accountUser.findMany({
    where: { userId: user.id },
    select: {
      financialAccount: {
        include: {
          accountUsers: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true
                }
              }
            },
            orderBy: { createdAt: "asc" },
            take: 5
          },
          investments: {
            where: { status: "open" },
            select: { totalProfit: true }
          },
          _count: {
            select: {
              accountUsers: true
            }
          }
        }
      }
    }
  });
  const financialAccounts = accountUsers.map(({ financialAccount }) => {
    const { accountUsers: accountUsers2, _count, ...rest } = financialAccount;
    const primaryUserAccount = accountUsers2.find(
      (au) => au.user.id === user.id
    );
    const otherUsers = accountUsers2.filter((au) => au.user.id !== user.id).map((au) => {
      var _a, _b, _c, _d;
      return {
        id: au.user.id,
        name: (_b = (_a = au.user) == null ? void 0 : _a.name) != null ? _b : "",
        image: (_d = (_c = au.user) == null ? void 0 : _c.image) != null ? _d : null,
        accountUserId: au.id
      };
    });
    return {
      ...rest,
      userCount: _count.accountUsers,
      primaryUser: primaryUserAccount ? {
        id: primaryUserAccount.user.id,
        name: primaryUserAccount.user.name,
        image: primaryUserAccount.user.image,
        accountUserId: primaryUserAccount.id
      } : null,
      users: otherUsers,
      totalProfit: financialAccount.investments.reduce(
        (acc, inv) => acc += inv.totalProfit,
        0
      )
    };
  });
  return { financialAccounts };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
