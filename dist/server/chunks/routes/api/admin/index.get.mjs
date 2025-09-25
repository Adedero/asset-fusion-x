import { d as defineEventHandler, a as getValidatedQuery, c as createError, p as prisma } from '../../../nitro/nitro.mjs';
import { p as paginationQuerySchema } from '../../../_/schemas.mjs';
import { z } from 'zod';
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
import 'fs';
import 'winston';
import 'node:url';
import '@prisma/client/runtime/client';
import '@prisma/adapter-pg';
import 'nodemailer';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'better-auth/plugins';
import '@iconify/utils';
import 'consola';
import 'ipx';

const index_get = defineEventHandler(async (event) => {
  const schema = z.object({
    ...paginationQuerySchema.shape,
    approved: z.coerce.boolean().optional()
  });
  const query = await getValidatedQuery(event, schema.safeParse);
  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: query.error.issues[0].message
    });
  }
  const { search = "", approved, page = 0, limit } = query.data;
  const profiles = await prisma.businessProfile.findMany({
    where: {
      AND: [
        { account: { name: { contains: search, mode: "insensitive" } } },
        approved ? { approved } : {}
      ]
    },
    select: {
      id: true,
      address: true,
      creationMonth: true,
      creationYear: true,
      proofOfAddress: true,
      proofOfAddressExt: true,
      certificate: true,
      certificateExt: true,
      approved: true,
      createdAt: true,
      account: {
        select: {
          name: true
        }
      }
    },
    skip: page * (limit != null ? limit : 0),
    take: limit,
    orderBy: {
      account: {
        name: "asc"
      }
    }
  });
  return profiles.map((profile) => ({
    ...profile,
    financialAccountName: profile.account.name,
    account: void 0
  }));
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
