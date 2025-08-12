import { prisma } from "~~/server/lib/prisma";

export default eventHandler(async (event) => {
  const user = event.context.user;

  const count = await prisma.notification.count({
    where: { userId: user.id, isRead: false },
  });

  return { count };
});
