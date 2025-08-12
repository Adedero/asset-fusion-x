import { d as defineEventHandler, p as prisma, c as createError } from '../../nitro/nitro.mjs';
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

const index_get = defineEventHandler(async () => {
  const settings = await prisma.settings.findFirst();
  if (!settings) {
    throw createError({
      statusCode: 404,
      statusMessage: "Settings not found."
    });
  }
  return settings;
});

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map
