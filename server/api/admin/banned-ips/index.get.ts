import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async () => {
  const bans = await prisma.bannedIp.findMany({
    orderBy: { createdAt: "desc" }
  });

  const userIds = [...new Set(bans.map((ban) => ban.userId).filter((id) => !!id))];
  const users = userIds.length
    ? await prisma.user.findMany({
        where: { id: { in: userIds } },
        select: { id: true, name: true, email: true }
      })
    : [];
  const usersById = new Map(users.map((user) => [user.id, user]));

  return bans.map((ban) => ({
    ...ban,
    user: ban.userId ? (usersById.get(ban.userId) ?? null) : null
  }));
});
