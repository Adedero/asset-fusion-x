import { prisma } from "~~/server/lib/prisma";
import { investmentPlanSchema } from "~~/shared/schemas/investment-plan";

export default defineEventHandler(async (event) => {
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
      category: data.category,
      name: data.name
    },
    select: {
      id: true
    }
  });

  if (existingPlan) {
    throw createError({
      statusCode: 400,
      statusMessage: `An investment plan with the name ${data.name} already exists in the ${data.category} category`
    });
  }

  await prisma.investmentPlan.create({
    data
  });

  return {
    message: "Investment plan created"
  };
});
