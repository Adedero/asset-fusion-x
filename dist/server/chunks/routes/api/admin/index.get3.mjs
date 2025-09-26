import { d as defineEventHandler, a as getValidatedQuery, c as createError, p as prisma } from '../../../nitro/nitro.mjs';
import { p as paginationQuerySchema } from '../../../_/schemas.mjs';
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
import 'ipx';
import 'zod';

const index_get = defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, paginationQuerySchema.safeParse);
  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: query.error.issues[0].message
    });
  }
  const { search = "", page = 0, limit, skip } = query.data;
  const profiles = await prisma.profile.findMany({
    where: {
      OR: [
        { user: { name: { contains: search } } },
        { user: { email: { contains: search } } }
      ]
    },
    select: {
      id: true,
      kycStatus: true,
      governmentIdType: true,
      governmentId: true,
      governmentIdExt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      }
    },
    skip: skip != null ? skip : page * (limit != null ? limit : 0),
    take: limit,
    orderBy: {
      updatedAt: "desc"
    }
  });
  return profiles.map((profile) => ({
    ...profile,
    userId: profile.user.id,
    fullName: profile.user.name,
    email: profile.user.email,
    image: profile.user.image,
    user: void 0
  }));
});

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map
