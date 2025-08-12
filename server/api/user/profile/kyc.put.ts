import { z } from "zod";
import { prisma } from "~~/server/lib/prisma";
import type { EventContextUser } from "~~/shared/types/user.types";

export default defineEventHandler(async (event) => {
  const user = event.context.user as EventContextUser;

  const schema = z.object({
    governmentId: z.string().min(1, "ID file (base64) is required"),
    governmentIdType: z.enum(
      ["international_passport", "driving_license", "national_id"],
      {
        message: "Select a valid ID type",
      }
    ),
    governmentIdExt: z.string().min(1, "File extension is required"),
  });

  const body = await readValidatedBody(event, schema.safeParse);

  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message,
    });
  }

  const { governmentId, governmentIdType, governmentIdExt } = body.data;

  const existingProfile = await prisma.profile.findUnique({
    where: { userId: user.id },
    select: { governmentId: true },
  });

  if (!existingProfile) {
    throw createError({
      statusCode: 404,
      statusMessage: "Profile not found",
    });
  }

  // Remove previous document if it exists
  if (existingProfile.governmentId) {
    await removeFileByUrl(existingProfile.governmentId);
  }

  // Save new document
  const { data, error } = await saveFile({
    id: user.id,
    base64Data: governmentId,
    extension: governmentIdExt,
    outputDir: `public/uploads/documents/users`,
  });

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message,
    });
  }

  // Update profile
  const updatedProfile = await prisma.profile.update({
    where: { userId: user.id },
    data: {
      governmentId: data?.url,
      governmentIdType,
      governmentIdExt,
      kycStatus: "pending",
    },
  });

  return {
    message: "Government ID uploaded successfully",
    profile: updatedProfile,
  };
});
