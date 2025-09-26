import { sendEmail } from "~~/server/email/nodemailer";
import type {
  FinancialAccount,
  Transaction
} from "~~/server/generated/prisma/client";
import { prisma } from "~~/server/lib/prisma";
import type { EventData } from "../types";
import transactionStatusUpdateEmail from "~~/server/email/templates/transaction-status-update-email";

export const onTransactionStatusUpdate = (
  ctx: EventData<{ transaction: Transaction; account: FinancialAccount }>
) => {
  const subject = `Update On ${ctx.data.transaction.type === "deposit" ? "Deposit" : "Withdrawal"} Request`;

  const userEmail = transactionStatusUpdateEmail({
    role: "user",
    subject,
    user: ctx.user,
    data: ctx.data
  });

  const adminEmail = transactionStatusUpdateEmail({
    role: "admin",
    subject,
    user: ctx.user,
    data: ctx.data
  });

  Promise.all([
    sendEmail({
      to: ctx.user.email,
      subject,
      html: userEmail
    }),

    sendEmail({
      to: process.env.ADMIN_EMAL ?? process.env.EMAIL_USER,
      subject,
      html: adminEmail
    }),

    prisma.notification.create({
      data: {
        userId: ctx.user.id,
        financialAccountId: ctx.data.account.id,
        title: subject,
        bodyType: "string",
        body: `The ${ctx.data.transaction.type} request on the account ${ctx.data.account.name} has been marked as ${ctx.data.transaction.status}.`
      }
    })
  ]);
};
