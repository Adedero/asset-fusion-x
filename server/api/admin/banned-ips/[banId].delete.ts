import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async (event) => {
  const { banId } = getRouterParams(event);
  await prisma.bannedIp.delete({
    where: { id: banId }
  });

  return {
    message: "Banned IP removed"
  };
});
