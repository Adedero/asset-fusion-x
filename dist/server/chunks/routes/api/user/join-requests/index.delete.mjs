import { d as defineEventHandler, f as getRequestParam, p as prisma, c as createError } from '../../../../nitro/nitro.mjs';
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

const index_delete = defineEventHandler(async (event) => {
  var _a;
  const requestId = getRequestParam(event, "requestId");
  const user = event.context.user;
  const joinRequest = await prisma.jointAccountRequest.findUnique({
    where: {
      id: requestId
    },
    include: {
      creator: {
        select: {
          email: true
        }
      }
    }
  });
  if (!joinRequest) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not found"
    });
  }
  if (user.email !== joinRequest.recipientEmail && user.email !== ((_a = joinRequest.creator) == null ? void 0 : _a.email)) {
    throw createError({
      statusCode: 403,
      statusMessage: "Not allowed"
    });
  }
  const deleted = await prisma.jointAccountRequest.delete({
    where: { id: requestId }
  });
  return deleted;
});

export { index_delete as default };
//# sourceMappingURL=index.delete.mjs.map
