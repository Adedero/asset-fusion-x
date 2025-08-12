import { d as defineEventHandler, g as getRequestParam, p as prisma, i as sendEmail } from '../../../../../nitro/nitro.mjs';
import { j as jointAccountRequestEmail } from '../../../../../_/joint-account-request-email.mjs';
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

const sendReminder_post = defineEventHandler(async (event) => {
  const requestId = getRequestParam(event, "requestId");
  const user = event.context.user;
  const joinRequest = await prisma.jointAccountRequest.findUniqueOrThrow({
    where: {
      id: requestId
    }
  });
  const financialAccount = await prisma.financialAccount.findUniqueOrThrow({
    where: {
      id: joinRequest.financialAccountId
    }
  });
  const subject = `Reminder: Request from ${user.name}`;
  const [, updated] = await Promise.all([
    sendEmail({
      to: {
        name: joinRequest.recipientName,
        address: joinRequest.recipientEmail
      },
      subject,
      html: jointAccountRequestEmail({
        subject,
        user,
        data: { account: financialAccount, request: joinRequest }
      })
    }),
    prisma.jointAccountRequest.update({
      where: {
        id: joinRequest.id
      },
      data: {
        reminderCount: {
          increment: 1
        },
        lastReminderAt: new Date(Date.now())
      }
    })
  ]);
  return updated;
});

export { sendReminder_post as default };
//# sourceMappingURL=send-reminder.post.mjs.map
