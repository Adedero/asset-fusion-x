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
      creator: {
        select: {
          email: true,
        },
      },
    },
  });

  if (!joinRequest) {
    throw createError({
      statusCode: 404,
      statusMessage: "Not found",
    });
  }

  if (
    user.email !== joinRequest.recipientEmail &&
    user.email !== joinRequest.creator?.email
  ) {
    throw createError({
      statusCode: 403,
      statusMessage: "Not allowed",
    });
  }

  const deleted = await prisma.jointAccountRequest.delete({
    where: { id: requestId },
  });

  return deleted;
});
