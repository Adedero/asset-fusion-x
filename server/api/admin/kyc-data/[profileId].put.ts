import { z } from "zod";
import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async (event) => {
  const { profileId } = getRouterParams(event);
  const schema = z.object({
    status: z.enum(
      ["pending", "verified", "rejected", "resubmit"],
      "Invalid KYC status"
    )
  });

  const { data, success, error } = await readValidatedBody(
    event,
    schema.safeParse
  );
  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: error.issues[0].message
    });
  }

  await prisma.profile.update({
    where: {
      id: profileId
    },
    data: {
      kycStatus: data.status
    }
  });

  return {
    message: "KYC status updated"
  };
});
