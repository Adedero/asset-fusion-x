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

  const existingPlan = await prisma.investmentPlan.findFirst({
    where: {
      AND: [
        { category: data.category, name: data.name },
        { NOT: { id: investmentPlanId } }
      ]
    }
  });

  if (existingPlan) {
    throw createError({
      statusCode: 400,
      statusMessage: `An investment plan with the name ${data.name} already exists in the ${data.category} category`
    });
  }

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
