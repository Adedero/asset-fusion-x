import { d as defineEventHandler, b as getRouterParam, c as createError, p as prisma } from '../../../../../nitro/nitro.mjs';
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

const businessProfile_get = defineEventHandler(async (event) => {
  const accountId = getRouterParam(event, "accountId");
  if (!accountId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Account ID is required"
    });
  }
  const businessProfile = await prisma.businessProfile.findUnique({
    where: { financialAccountId: accountId, account: { type: "business" } }
  });
  return { profile: businessProfile };
});

export { businessProfile_get as default };
//# sourceMappingURL=business-profile.get.mjs.map
