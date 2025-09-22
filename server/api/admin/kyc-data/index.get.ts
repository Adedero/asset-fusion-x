import { prisma } from "~~/server/lib/prisma";
import { paginationQuerySchema } from "~~/shared/schemas";

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, paginationQuerySchema.safeParse);
  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: query.error.issues[0].message
    });
  }
  const { search = "", page = 0, limit, skip } = query.data;

  const profiles = await prisma.profile.findMany({
    where: {
      OR: [
        { user: { name: { contains: search, mode: "insensitive" } } },
        { user: { email: { contains: search, mode: "insensitive" } } }
      ]
    },
    select: {
      id: true,
      kycStatus: true,
      governmentIdType: true,
      governmentId: true,
      governmentIdExt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true
        }
      }
    },
    skip: skip ?? page * (limit ?? 0),
    take: limit,
    orderBy: {
      updatedAt: "desc"
    }
  });

  return profiles.map((profile) => ({
    ...profile,
    userId: profile.user.id,
    fullName: profile.user.name,
    email: profile.user.email,
    image: profile.user.image,
    user: undefined
  }));
});
