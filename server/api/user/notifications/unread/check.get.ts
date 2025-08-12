import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async (event) => {
  const user = event.context.user;

  const unreadNotification = await prisma.notification.findFirst({
    where: { userId: user.id, isRead: false },
    select: { id: true },
  });

  return { hasUnreadNotifications: !!unreadNotification };
});
