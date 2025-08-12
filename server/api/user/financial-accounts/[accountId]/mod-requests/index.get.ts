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

  const modRequests = await prisma.jointAccountModRequest.findMany({
    where: {
      financialAccountId: accountId,
    },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      approvals: {
        include: {
          approver: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
      transaction: {
        select: {
          USDAmount: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const ownRequests: typeof modRequests = [];
  const otherRequests: typeof modRequests = [];

  modRequests.forEach((request) => {
    if (request.creator.id === user.id) {
      ownRequests.push(request);
    } else {
      otherRequests.push(request);
    }
  });

  return {
    allRequests: modRequests,
    ownRequests,
    otherRequests,
  };
});
