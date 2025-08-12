import { prisma } from "~~/server/lib/prisma";
import { paginationQuerySchema } from "~~/shared/schemas";

const LIMIT = parseInt(process.env.GET_REQUEST_LIMIT || "20");

export default defineEventHandler(async (event) => {
  const user = event.context.user as EventContextUser;

  const query = await getValidatedQuery(event, paginationQuerySchema.safeParse);

  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: query.error.issues[0].message,
    });
  }

  const { skip = 0, limit = LIMIT } = query.data;

  const notifications = await prisma.notification.findMany({
    where: {
      userId: user.id,
    },
    take: limit,
    skip,
    orderBy: {
      createdAt: "desc",
    },
  });

  return notifications;
});
