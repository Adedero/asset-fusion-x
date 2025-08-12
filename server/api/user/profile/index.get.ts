import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async (event) => {
  const user = event.context.user as { id: string };

  const profile = await prisma.profile.findUnique({
    where: { userId: user.id },
  });

  return { profile };
});
