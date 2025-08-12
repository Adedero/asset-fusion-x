import { prisma } from "~~/server/lib/prisma";
import type { EventContextUser } from "~~/shared/types/user.types";

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

  const joinRequests = await prisma.jointAccountRequest.findMany({
    where: { financialAccountId: accountId },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      recipient: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return joinRequests;
});
