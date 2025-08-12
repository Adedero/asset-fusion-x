import { prisma } from "~~/server/lib/prisma";
import type { EventContextUser } from "~~/shared/types/user.types";

export default defineEventHandler(async (event) => {
  const user = event.context.user as EventContextUser;

  const joinRequests = await prisma.jointAccountRequest.findMany({
    where: {
      recipientEmail: user.email,
      financialAccount: {
        ownership: "joint",
        status: "active",
      },
    },
    include: {
      creator: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
      financialAccount: {
        select: {
          name: true,
          createdAt: true,
        },
      },
    },
  });

  return joinRequests;
});
