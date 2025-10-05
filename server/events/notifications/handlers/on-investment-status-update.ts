import { sendEmail } from "~~/server/email/nodemailer";
import type {
  FinancialAccount,
  Investment
} from "~~/server/generated/prisma/client";
import { prisma } from "~~/server/lib/prisma";
import type { EventData } from "../types";
import investmentStatusUpdateEmail from "~~/server/email/templates/investment-status-update-email";

export const onInvestmentStatusUpdate = (
  ctx: EventData<{ investment: Investment; account: FinancialAccount }>
) => {
  const subject = "Financial Investment Status Update";

  const userEmail = investmentStatusUpdateEmail({
    role: "user",
    subject,
    user: ctx.user,
    data: ctx.data
  });

  const adminEmail = investmentStatusUpdateEmail({
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
        body: `The status of your investment ${ctx.data.investment.investmentName} has been updated to ${ctx.data.investment.status}.`
      }
    })
  ]);
};
