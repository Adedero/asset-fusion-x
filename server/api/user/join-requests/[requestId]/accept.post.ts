import { prisma } from "~~/server/lib/prisma";
import getRequestParam from "~~/server/utils/get-request-param";
import type { EventContextUser } from "~~/shared/types/user.types";

export default defineEventHandler(async (event) => {
  const requestId = getRequestParam(event, "requestId");

  const user = event.context.user as EventContextUser;

  const joinRequest = await prisma.jointAccountRequest.findUnique({
    where: {
      id: requestId,
    },
    include: {
      financialAccount: true,
    },
  });

  if (!joinRequest) {
    throw createError({
      statusCode: 404,
      statusMessage: "Account request does not exist or may have been revoked.",
    });
  }

  if (user.email !== joinRequest.recipientEmail) {
    throw createError({
      statusCode: 403,
      statusMessage: "Not allowed",
    });
  }

  const { financialAccount } = joinRequest;

  if (
    financialAccount.status !== "active" ||
    financialAccount.ownership !== "joint"
  ) {
    throw createError({
      statusCode: 400,
      statusMessage:
        "This account is either inactive or does not accept multiple members.",
    });
  }

  await Promise.all([
    await prisma.accountUser.create({
      data: {
        userId: user.id,
        financialAccountId: financialAccount.id,
        role: joinRequest.role,
        ownership: joinRequest.ownership,
      },
    }),

    await prisma.jointAccountRequest.delete({ where: { id: joinRequest.id } }),
  ]);

  // send email and notifications
});
