import z from "zod";
import { prisma } from "~~/server/lib/prisma";
import terminateInvestment from "~~/server/utils/terminate-investment";

const schema = z.object({
  terminationFee: z
    .number("Invalid termination fee")
    .min(0, "Termination fee must be at least 0")
    .optional(),
  applyTerminationFee: z.boolean().optional(),
  terminatedReason: z.string("Invalid termination reason").nullish(),
  pausedReason: z.string("Invalid pause reason").nullish(),
  status: z
    .enum(
      ["open", "closed", "paused", "terminated"],
      "Invalid investment status"
    )
    .optional()
});

export default defineEventHandler(async (event) => {
  const { investmentId } = getRouterParams(event);

  const investment = await prisma.investment.findUnique({
    where: { id: investmentId }
  });

  if (!investment) {
    throw createError({
      statusCode: 404,
      statusMessage: "Investment not found"
    });
  }

  if (investment.status === "terminated" || investment.status === "closed") {
    throw createError({
      statusCode: 400,
      statusMessage: "Cannot update closed or terminated investments."
    });
  }

  const body = await readValidatedBody(event, schema.safeParse);

  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message
    });
  }

  const {
    status,
    terminationFee,
    pausedReason,
    terminatedReason,
    applyTerminationFee
  } = body.data;


  if (typeof terminationFee !== "undefined") {
    await prisma.investment.update({
      where: {
        id: investmentId
      },
      data: {
        terminationFee
      }
    });
  } else if (typeof status !== "undefined") {
    if (status === "terminated") {
      await terminateInvestment(investment.id, {
        applyTerminationFee,
        terminatedReason
      });
    } else {
      const updates = {
        status,
        pausedReason: status === "paused" ? pausedReason : null,
        pausedAt: status === "paused" ? new Date() : null
      };
      await prisma.investment.update({
        where: {
          id: investmentId
        },
        data: updates
      });
    }
  }

  return {
    message: "Investment updated successfully."
  };
});
