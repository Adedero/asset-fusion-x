import { sendEmail } from "~~/server/email/nodemailer";
import type {
  FinancialAccount,
  Transaction,
} from "~~/server/generated/prisma/client";
import { prisma } from "~~/server/lib/prisma";
import type { EventData } from "../types";
import withdrawalCreateEmail from "~~/server/email/templates/withdrawal-create-email";

export const onWithdrawalCreate = (
  ctx: EventData<{ transaction: Transaction; account: FinancialAccount }>,
) => {
  const subject = "New Deposit Request";

  const userEmail = withdrawalCreateEmail({
    role: "user",
    subject,
    user: ctx.user,
    data: ctx.data,
  });

  const adminEmail = withdrawalCreateEmail({
    role: "admin",
    subject,
    user: ctx.user,
    data: ctx.data,
  });

  Promise.all([
    sendEmail({
      to: ctx.user.email,
      subject,
      html: userEmail,
    }),

    sendEmail({
      to: process.env.ADMIN_EMAL ?? process.env.EMAIL_USER,
      subject,
      html: adminEmail,
    }),

    prisma.notification.create({
      data: {
        userId: ctx.user.id,
        financialAccountId: ctx.data.account.id,
        title: subject,
        bodyType: "string",
        body: `You initiated a withdrawal request of $${ctx.data.transaction.USDAmount.toLocaleString()} on your account ${ctx.data.account.name}`,
      },
    }),
  ]);
};
