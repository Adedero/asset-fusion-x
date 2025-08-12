import z from "zod";
import { sendEmail } from "~~/server/email/nodemailer";
import jointAccountRequestEmail from "~~/server/email/templates/joint-account-request-email";
import type { AccountUserRole } from "~~/server/generated/prisma/enums";
import { prisma } from "~~/server/lib/prisma";
import { JointAccountRequestSchema } from "~~/shared/schemas";

export default defineEventHandler(async (event) => {
  const accountId = getRouterParam(event, "accountId");
  if (!accountId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Account ID is required",
    });
  }

  const user = event.context.user as EventContextUser;

  const isAccountMember = await prisma.accountUser.findFirst({
    where: { userId: user.id, financialAccountId: accountId },
    select: { id: true },
  });

  if (!isAccountMember) {
    throw createError({
      statusCode: 403,
      statusMessage: "Not allowed",
    });
  }

  // Get request body
  const schema = JointAccountRequestSchema.extend({
    role: z.string(),
  });

  const body = await readValidatedBody(event, schema.safeParse);

  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message,
    });
  }

  const { data } = body;

  //Check if account is joint and if status is activee
  const financialAccount = await prisma.financialAccount.findUnique({
    where: { id: accountId, status: "active", ownership: "joint" },
    include: {
      accountUsers: {
        select: {
          id: true,
          user: {
            select: {
              email: true,
            },
          },
        },
      },
      jointAccountRequests: {
        select: {
          recipientEmail: true,
        },
      },
    },
  });

  if (!financialAccount) {
    throw createError({
      statusCode: 400,
      statusMessage: "Account not found or inactive.",
    });
  }

  // Ensure not more than 5 partners can be added to an account
  const MAX_JOINT_PARTNERS = parseInt(process.env.MAX_JOINT_PARTNERS ?? "5");

  if (financialAccount.accountUsers.length === MAX_JOINT_PARTNERS) {
    throw createError({
      statusCode: 400,
      statusMessage: `Account may not have more than ${MAX_JOINT_PARTNERS} partners`,
    });
  }

  // Ensure the requested user is not already a partner and has not already been requested
  const isPreviousMember = financialAccount.accountUsers.find(
    (member) => member.user.email === data.recipientEmail,
  );

  if (isPreviousMember) {
    throw createError({
      statusCode: 400,
      statusMessage: "The requested user is already an account partner",
    });
  }

  const hasBeenRequested = financialAccount.jointAccountRequests.find(
    (request) => request.recipientEmail === data.recipientEmail,
  );

  if (hasBeenRequested) {
    throw createError({
      statusCode: 400,
      statusMessage:
        "The user has already been sent a request. You can send a reminder instead.",
    });
  }

  const requestedUser = await prisma.user.findUnique({
    where: { email: data.recipientEmail },
  });

  const request = await prisma.jointAccountRequest.create({
    data: {
      creatorId: user.id,
      recipientName: data.recipientName,
      recipientEmail: data.recipientEmail,
      role: data.role as AccountUserRole,
      ownership: data.ownership,
      recipientId: requestedUser?.id ?? null,
      financialAccountId: financialAccount.id,
      description: data.description,
    },
  });

  const subject = `Request from ${user.name}`;

  await sendEmail({
    to: {
      name: request.recipientName,
      address: request.recipientEmail,
    },
    subject,
    html: jointAccountRequestEmail({
      subject,
      user,
      data: { account: financialAccount, request },
    }),
  });

  if (requestedUser) {
    // create notification
    await prisma.notification.create({
      data: {
        userId: requestedUser.id,
        title: subject,
        body: `${user.name} wants you to join their account ${financialAccount.name} as ${request.role}`,
      },
    });
  }

  return request;
});
