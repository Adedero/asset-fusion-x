import z from "zod";
import { prisma } from "~~/server/lib/prisma";

const schema = z.object({
  actualAmount: z.number("Invalid actual amount")
});

export default defineEventHandler(async (event) => {
  const { profitId } = getRouterParams(event);

  const body = await readValidatedBody(event, schema.safeParse);

  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message
    });
  }

  const { actualAmount } = body.data;

  await prisma.profit.update({
    where: {
      id: profitId
    },
    data: {
      actualAmount
    }
  });

  return {
    message: "Profit updated"
  };
});
