import { auth } from "~~/server/lib/auth";
import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async (event) => {
  const { userId } = getRouterParams(event);

  await auth.api.unbanUser({
    body: { userId },
    headers: event.headers
  });

  await prisma.bannedIp.deleteMany({ where: { userId } });

  return { message: "User unbanned" };
});
