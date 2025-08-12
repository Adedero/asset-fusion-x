import { sendEmail } from "~~/server/email/nodemailer";
import financialAccountCreateEmail from "~~/server/email/templates/financial-accout-create-email";
import type { FinancialAccount } from "~~/server/generated/prisma/client";
import { prisma } from "~~/server/lib/prisma";
import type { EventData } from "../types";

export const onFinancialAccountCreate = (
  ctx: EventData<{ account: FinancialAccount }>,
) => {
  const subject = "Financial Account Creation";

  const userEmail = financialAccountCreateEmail({
    role: "user",
    subject,
    user: ctx.user,
    data: ctx.data,
  });

  const adminEmail = financialAccountCreateEmail({
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
        title: subject,
        bodyType: "string",
        body: `You created a new account: ${ctx.data.account.name}`,
      },
    }),
  ]);
};
