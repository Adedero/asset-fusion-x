import { c as defineEventHandler, l as getRequestParam, p as prisma, k as sendEmail } from '../../../../../_/nitro.mjs';
import { j as jointAccountRequestEmail } from '../../../../../_/joint-account-request-email.mjs';
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
