import { prisma } from "~~/server/lib/prisma";
import { currencySchema } from "~~/shared/schemas/currency";

export default defineEventHandler(async (event) => {
  const { currencyId } = getRouterParams(event);
  const body = await readValidatedBody(event, currencySchema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message
    });
  }

  const { data } = body;

  const existingCurrency = await prisma.currency.findFirst({
    where: {
      AND: [{ symbol: data.symbol }, { NOT: { id: currencyId } }]
    }
  });

  if (existingCurrency) {
    throw createError({
      statusCode: 400,
      statusMessage: `A currency with this symbol: ${data.symbol} already exists`
    });
  }

  await prisma.currency.update({
    where: {
      id: currencyId
    },
    data
  });

  return {
    message: "Currency updated successfully"
  };
});
