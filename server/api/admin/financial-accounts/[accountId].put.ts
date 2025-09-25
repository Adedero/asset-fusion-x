import { prisma } from "~~/server/lib/prisma";
import { financialAccountSchema } from "~~/shared/schemas/financial-accounts";

export default defineEventHandler(async (event) => {
  const { accountId } = getRouterParams(event);
  const body = await readValidatedBody(event, financialAccountSchema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message
    });
  }

  const { data } = body;

  await prisma.financialAccount.update({
    where: {
      id: accountId
    },
    data
  });

  return {
    message: "Financial account updated successfully"
  };
});
