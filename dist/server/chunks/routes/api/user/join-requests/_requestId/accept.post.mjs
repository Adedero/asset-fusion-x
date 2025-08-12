import { d as defineEventHandler, g as getRequestParam, p as prisma, c as createError } from '../../../../../nitro/nitro.mjs';
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

const accept_post = defineEventHandler(async (event) => {
  const requestId = getRequestParam(event, "requestId");
  const user = event.context.user;
  const joinRequest = await prisma.jointAccountRequest.findUnique({
    where: {
      id: requestId
    },
    include: {
      financialAccount: true
    }
  });
  if (!joinRequest) {
    throw createError({
      statusCode: 404,
      statusMessage: "Account request does not exist or may have been revoked."
    });
  }
  if (user.email !== joinRequest.recipientEmail) {
    throw createError({
      statusCode: 403,
      statusMessage: "Not allowed"
    });
  }
  const { financialAccount } = joinRequest;
  if (financialAccount.status !== "active" || financialAccount.ownership !== "joint") {
    throw createError({
      statusCode: 400,
      statusMessage: "This account is either inactive or does not accept multiple members."
    });
  }
  await Promise.all([
    await prisma.accountUser.create({
      data: {
        userId: user.id,
        financialAccountId: financialAccount.id,
        role: joinRequest.role,
        ownership: joinRequest.ownership
      }
    }),
    await prisma.jointAccountRequest.delete({ where: { id: joinRequest.id } })
  ]);
});

export { accept_post as default };
//# sourceMappingURL=accept.post.mjs.map
