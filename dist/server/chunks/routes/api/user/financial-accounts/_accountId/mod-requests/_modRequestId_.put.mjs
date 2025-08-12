import { d as defineEventHandler, h as getValidatedQuery, c as createError, f as getRouterParams, p as prisma, j as reverseTransaction } from '../../../../../../nitro/nitro.mjs';
import z from 'zod';
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

const _modRequestId__put = defineEventHandler(async (event) => {
  const schema = z.object({
    approvalId: z.string({ message: "Approval ID is required" }),
    status: z.enum(["accepted", "rejected"], {
      message: "Status must either be 'accepted' or 'rejected'"
    })
  });
  const query = await getValidatedQuery(event, schema.safeParse);
  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: query.error.issues[0].message
    });
  }
  const user = event.context.user;
  const { approvalId, status } = query.data;
  const { accountId, modRequestId } = getRouterParams(event);
  if (!accountId || !modRequestId) {
    throw createError({
      statusCode: 400,
      statusMessage: "No account or request ID found"
    });
  }
  const request = await prisma.jointAccountModRequest.findUniqueOrThrow({
    where: {
      id: modRequestId
    }
  });
  const updated = await prisma.jointAccountModRequestApproval.update({
    where: {
      id: approvalId,
      approverId: user.id,
      jointAccountModRequestId: modRequestId,
      request: {
        financialAccountId: accountId
      }
    },
    data: {
      status
    }
  });
  if (status === "rejected" && request.transactionId) {
    await reverseTransaction(accountId, request.transactionId, "reversed");
    await prisma.jointAccountModRequest.delete({
      where: { id: modRequestId }
    });
  }
  return {
    approval: updated,
    message: "Status updated successfully"
  };
});

export { _modRequestId__put as default };
//# sourceMappingURL=_modRequestId_.put.mjs.map
