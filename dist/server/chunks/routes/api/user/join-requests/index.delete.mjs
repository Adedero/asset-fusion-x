import { d as defineEventHandler, g as getRequestParam, p as prisma, c as createError } from '../../../../nitro/nitro.mjs';
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
