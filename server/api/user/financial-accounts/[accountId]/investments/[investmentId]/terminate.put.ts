import z from "zod";
import { prisma } from "~~/server/lib/prisma";

const schema = z.object({
  terminatedReason: z
    .string("Invalid termination reason")
    .nonempty("Reason is required.")
    .trim()
})

export default defineEventHandler(async (event) => {
  const { accountId, investmentId} = getRouterParams(event);

  const investment = await prisma.investment.findUnique({
    where: {
      id: investmentId,
      financialAccountId: accountId
    }
  })

  if (!investment) {
    throw createError({
      statusCode: 404,
      statusMessage: "Investment not found"
    });
  }

  const body = await readValidatedBody(event, schema.safeParse);

  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message
    });
  }

  await terminateInvestment(investmentId, {
    applyTerminationFee: true,
    terminatedReason: body.data.terminatedReason
  });

  return {
    message: "Investment terminated successfully."
  };
})