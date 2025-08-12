import { sendEmail } from "~~/server/email/nodemailer";
import type {
  FinancialAccount,
  Investment,
} from "~~/server/generated/prisma/client";
import { prisma } from "~~/server/lib/prisma";
import type { EventData } from "../types";
import investmentCreateEmail from "~~/server/email/templates/investment-create-email";

export const onInvestmentCreate = (
  ctx: EventData<{ investment: Investment; account: FinancialAccount }>,
) => {
  const subject = "New Financial Investment";

  const userEmail = investmentCreateEmail({
    role: "user",
    subject,
    user: ctx.user,
    data: ctx.data,
  });

  const adminEmail = investmentCreateEmail({
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
        body: `You started a new investment with $${ctx.data.investment.deposit.toLocaleString()} on your account ${ctx.data.account.name}`,
      },
    }),
  ]);
};
