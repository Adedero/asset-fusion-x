import { prisma } from "~~/server/lib/prisma";
import type { EventContextUser } from "~~/shared/types/user.types";

export default defineEventHandler(async (event) => {
  const user = event.context.user as EventContextUser;
  const accountId = getRequestParam(event, "accountId");
  const accountUserId = getRequestParam(event, "accountUserId");

  const [financialAccount, accountUser] = await Promise.all([
    prisma.financialAccount.findUniqueOrThrow({
      where: {
        id: accountId,
      },
    }),

    await prisma.accountUser.findUniqueOrThrow({
      where: {
        id: accountUserId,
        financialAccountId: accountId,
      },
    }),
  ]);

  if (financialAccount.creatorId !== user.id) {
    throw createError({
      statusCode: 403,
      statusMessage: "Not allowed",
    });
  }

  if (accountUser.userId === user.id) {
    throw createError({
      statusCode: 400,
      statusMessage:
        "You cannot remove yourself from an account. Ask the account cretaor to remove you.",
    });
  }

  const deleted = await prisma.accountUser.delete({
    where: {
      id: accountUser.id,
      financialAccountId: financialAccount.id,
    },
  });

  return deleted;
});
