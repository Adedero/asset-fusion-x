import { c as defineEventHandler, r as readValidatedBody, e as createError, p as prisma } from '../../../_/nitro.mjs';
import z from 'zod';
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
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'better-auth/plugins';
import '@iconify/utils';
import 'node:crypto';
import 'consola';

const settingsSchema = z.object({
  allowWithdrawals: z.boolean()
});

const index_put = defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, settingsSchema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message
    });
  }
  const { data } = body;
  await prisma.settings.updateMany({
    data
  });
  return {
    message: "Settings updated successfully"
  };
});

export { index_put as default };
//# sourceMappingURL=index.put.mjs.map
