import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async (event) => {
  const { investmentPlanId } = getRouterParams(event);
  await prisma.investmentPlan.delete({
    where: {
      id: investmentPlanId
    }
  });

  return {
    message: "Investment plan deleted"
  };
});
