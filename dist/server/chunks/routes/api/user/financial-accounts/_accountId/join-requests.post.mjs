import { d as defineEventHandler, b as getRouterParam, c as createError, p as prisma, r as readValidatedBody, i as sendEmail } from '../../../../../nitro/nitro.mjs';
import z from 'zod';
import { j as jointAccountRequestEmail } from '../../../../../_/joint-account-request-email.mjs';
import { J as JointAccountRequestSchema } from '../../../../../_/schemas.mjs';
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

const joinRequests_post = defineEventHandler(async (event) => {
  var _a, _b;
  const accountId = getRouterParam(event, "accountId");
  if (!accountId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Account ID is required"
    });
  }
  const user = event.context.user;
  const isAccountMember = await prisma.accountUser.findFirst({
    where: { userId: user.id, financialAccountId: accountId },
    select: { id: true }
  });
  if (!isAccountMember) {
    throw createError({
      statusCode: 403,
      statusMessage: "Not allowed"
    });
  }
  const schema = JointAccountRequestSchema.extend({
    role: z.string()
  });
  const body = await readValidatedBody(event, schema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message
    });
  }
  const { data } = body;
  const financialAccount = await prisma.financialAccount.findUnique({
    where: { id: accountId, status: "active", ownership: "joint" },
    include: {
      accountUsers: {
        select: {
          id: true,
          user: {
            select: {
              email: true
            }
          }
        }
      },
      jointAccountRequests: {
        select: {
          recipientEmail: true
        }
      }
    }
  });
  if (!financialAccount) {
    throw createError({
      statusCode: 400,
      statusMessage: "Account not found or inactive."
    });
  }
  const MAX_JOINT_PARTNERS = parseInt((_a = process.env.MAX_JOINT_PARTNERS) != null ? _a : "5");
  if (financialAccount.accountUsers.length === MAX_JOINT_PARTNERS) {
    throw createError({
      statusCode: 400,
      statusMessage: `Account may not have more than ${MAX_JOINT_PARTNERS} partners`
    });
  }
  const isPreviousMember = financialAccount.accountUsers.find(
    (member) => member.user.email === data.recipientEmail
  );
  if (isPreviousMember) {
    throw createError({
      statusCode: 400,
      statusMessage: "The requested user is already an account partner"
    });
  }
  const hasBeenRequested = financialAccount.jointAccountRequests.find(
    (request2) => request2.recipientEmail === data.recipientEmail
  );
  if (hasBeenRequested) {
    throw createError({
      statusCode: 400,
      statusMessage: "The user has already been sent a request. You can send a reminder instead."
    });
  }
  const requestedUser = await prisma.user.findUnique({
    where: { email: data.recipientEmail }
  });
  const request = await prisma.jointAccountRequest.create({
    data: {
      creatorId: user.id,
      recipientName: data.recipientName,
      recipientEmail: data.recipientEmail,
      role: data.role,
      ownership: data.ownership,
      recipientId: (_b = requestedUser == null ? void 0 : requestedUser.id) != null ? _b : null,
      financialAccountId: financialAccount.id,
      description: data.description
    }
  });
  const subject = `Request from ${user.name}`;
  await sendEmail({
    to: {
      name: request.recipientName,
      address: request.recipientEmail
    },
    subject,
    html: jointAccountRequestEmail({
      subject,
      user,
      data: { account: financialAccount, request }
    })
  });
  if (requestedUser) {
    await prisma.notification.create({
      data: {
        userId: requestedUser.id,
        title: subject,
        body: `${user.name} wants you to join their account ${financialAccount.name} as ${request.role}`
      }
    });
  }
  return request;
});

export { joinRequests_post as default };
//# sourceMappingURL=join-requests.post.mjs.map
