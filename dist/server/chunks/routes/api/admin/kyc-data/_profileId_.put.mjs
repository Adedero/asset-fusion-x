import { c as defineEventHandler, g as getRouterParams, r as readValidatedBody, e as createError, p as prisma } from '../../../../_/nitro.mjs';
import { z } from 'zod';
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

const _profileId__put = defineEventHandler(async (event) => {
  const { profileId } = getRouterParams(event);
  const schema = z.object({
    status: z.enum(
      ["pending", "verified", "rejected", "resubmit"],
      "Invalid KYC status"
    )
  });
  const { data, success, error } = await readValidatedBody(
    event,
    schema.safeParse
  );
  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: error.issues[0].message
    });
  }
  await prisma.profile.update({
    where: {
      id: profileId
    },
    data: {
      kycStatus: data.status
    }
  });
  return {
    message: "KYC status updated"
  };
});

export { _profileId__put as default };
//# sourceMappingURL=_profileId_.put.mjs.map
