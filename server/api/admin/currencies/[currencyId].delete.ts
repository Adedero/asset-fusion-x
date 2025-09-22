import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async (event) => {
  const { currencyId } = getRouterParams(event);
  await prisma.currency.delete({
    where: {
      id: currencyId
    }
  });

  return {
    message: "Currency deleted"
  };
});
