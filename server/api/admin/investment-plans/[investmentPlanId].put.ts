import { prisma } from "~~/server/lib/prisma";
import { investmentPlanSchema } from "~~/shared/schemas/investment-plan";

export default defineEventHandler(async (event) => {
  const { investmentPlanId } = getRouterParams(event);
  const body = await readValidatedBody(event, investmentPlanSchema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message
    });
  }

  const { data } = body;

  await prisma.investmentPlan.update({
    where: {
      id: investmentPlanId
    },
    data
  });

  return {
    message: "Investment plan updated successfully"
  };
});
