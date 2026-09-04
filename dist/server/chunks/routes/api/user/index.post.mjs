import { c as defineEventHandler, r as readValidatedBody, e as createError, p as prisma, y as generateAccountNumber, n as notificationEmitter } from '../../../_/nitro.mjs';
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
import '@better-auth/core/utils';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'better-auth/plugins';
import '@iconify/utils';
import 'node:crypto';
import 'consola';

const index_post = defineEventHandler(async (event) => {
  var _a;
  const schema = z.object({
    accountName: z.string().min(3, { message: "Account name is required." }),
    accountType: z.enum(["personal", "business"], {
      message: "Account type must either be personal or business"
    }),
    accountOwnership: z.enum(["single", "joint"], {
      message: "Account ownership must either be single or joint"
    }),
    jointOwnershipRole: z.enum([
      "owner",
      "co_owner",
      "manager",
      "admin",
      "accountant",
      "investor",
      "contributor",
      "legal_guardian",
      "signatory"
    ]).optional(),
    jointOwnership: z.number().nonnegative({ message: "Ownership cannot be negative" }).max(100, { message: "Ownership cannot be more than 100%" }).optional()
  });
  const body = await readValidatedBody(event, schema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message
    });
  }
  const user = event.context.user;
  const MAX_ACCOUNTS = parseInt((_a = process.env.MAX_ACCOUNTS) != null ? _a : "20");
  const accountMemberships = await prisma.accountUser.count({
    where: { userId: user.id }
  });
  if (accountMemberships === MAX_ACCOUNTS) {
    throw createError({
      statusCode: 400,
      statusMessage: `You cannot create more than ${MAX_ACCOUNTS} accounts.`
    });
  }
  const {
    accountName,
    accountOwnership,
    accountType,
    jointOwnership,
    jointOwnershipRole
  } = body.data;
  const financialAccount = await prisma.financialAccount.create({
    data: {
      creatorId: user.id,
      name: accountName,
      number: generateAccountNumber(accountType, accountOwnership),
      status: "active",
      type: accountType,
      ownership: accountOwnership
    }
  });
  await prisma.accountUser.create({
    data: {
      userId: user.id,
      financialAccountId: financialAccount.id,
      role: accountOwnership === "single" ? "owner" : jointOwnershipRole,
      ownership: accountOwnership === "single" ? 100 : jointOwnership
    }
  });
  notificationEmitter.emit("financial-account:create", {
    user,
    data: {
      account: financialAccount
    }
  });
  return {
    success: true,
    statusMessage: "Account created successfully"
  };
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
