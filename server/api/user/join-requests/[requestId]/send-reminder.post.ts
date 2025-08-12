import { sendEmail } from "~~/server/email/nodemailer";
import jointAccountRequestEmail from "~~/server/email/templates/joint-account-request-email";
import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async (event) => {
  const requestId = getRequestParam(event, "requestId");
  const user = event.context.user as EventContextUser;

  const joinRequest = await prisma.jointAccountRequest.findUniqueOrThrow({
    where: {
      id: requestId,
    },
  });

  const financialAccount = await prisma.financialAccount.findUniqueOrThrow({
    where: {
      id: joinRequest.financialAccountId,
    },
  });

  const subject = `Reminder: Request from ${user.name}`;

  const [, updated] = await Promise.all([
    sendEmail({
      to: {
        name: joinRequest.recipientName,
        address: joinRequest.recipientEmail,
      },
      subject,
      html: jointAccountRequestEmail({
        subject,
        user,
        data: { account: financialAccount, request: joinRequest },
      }),
    }),
    prisma.jointAccountRequest.update({
      where: {
        id: joinRequest.id,
      },
      data: {
        reminderCount: {
          increment: 1,
        },
        lastReminderAt: new Date(Date.now()),
      },
    }),
  ]);

  return updated;
});
