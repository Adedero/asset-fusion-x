import { prisma } from "~~/server/lib/prisma";
import { FinancialAccountSchema } from "~~/shared/zod";

export default defineEventHandler(async (event) => {
  const { accountId } = getRouterParams(event);
  const { data, error, success } = await readValidatedBody(
    event,
    FinancialAccountSchema.partial().safeParse,
  );

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: error.issues[0].message,
    });
  }

  const updated = await prisma.financialAccount.update({
    where: {
      id: accountId,
    },
    data: {
      ...data,
    },
  });

  return updated;
});
