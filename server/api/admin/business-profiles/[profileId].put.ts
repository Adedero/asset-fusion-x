import { z } from "zod";
import { prisma } from "~~/server/lib/prisma";

export default defineEventHandler(async (event) => {
  const { profileId } = getRouterParams(event);
  const schema = z.object({
    approved: z.boolean()
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

  await prisma.businessProfile.update({
    where: {
      id: profileId
    },
    data: {
      approved: data.approved
    }
  });

  return {
    message: "Business profile approval updated"
  };
});
