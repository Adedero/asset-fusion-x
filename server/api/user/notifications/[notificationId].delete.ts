import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async (event) => {
  const { notificationId } = getRouterParams(event);

  const deleted = await prisma.notification.delete({
    where: {
      id: notificationId,
    },
  });

  return {
    notification: deleted,
  };
});
