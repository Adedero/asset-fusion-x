import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async (event) => {
  const accountId = getRouterParam(event, "accountId");
  if (!accountId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Account ID is required",
    });
  }

  const businessProfile = await prisma.businessProfile.findUnique({
    where: { financialAccountId: accountId, account: { type: "business" } },
  });

  return { profile: businessProfile };
});
