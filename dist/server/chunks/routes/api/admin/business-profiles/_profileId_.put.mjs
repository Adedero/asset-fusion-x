import { d as defineEventHandler, g as getRouterParams, r as readValidatedBody, c as createError, p as prisma } from '../../../../nitro/nitro.mjs';
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

const _profileId__put = defineEventHandler(async (event) => {
  const { profileId } = getRouterParams(event);
  const schema = z.object({
    approved: z.boolean()
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
  await prisma.businessProfile.update({
    where: {
      id: profileId
    },
    data: {
      approved: data.approved
    }
  });
  return {
    message: "Business profile approval updated"
  };
});

export { _profileId__put as default };
//# sourceMappingURL=_profileId_.put.mjs.map
