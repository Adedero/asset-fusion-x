import { d as defineEventHandler, a as auth, t as toWebRequest } from '../../../nitro/nitro.mjs';
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

const ____all_ = defineEventHandler((event) => {
  return auth.handler(toWebRequest(event));
});

export { ____all_ as default };
//# sourceMappingURL=_...all_.mjs.map
