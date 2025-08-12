import { z } from "zod";
import { prisma } from "~~/server/lib/prisma";
import { removeUserImage, saveUserImage } from "~~/server/utils/user-image";

export default defineEventHandler(async (event) => {
  const schema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    image: z.string().nullish(),
  });

  const body = await readValidatedBody(event, schema.safeParse);

  if (!body.success) {
    throw createError({
      statusCode: 400,
      message: body.error.issues[0].message,
    });
  }

  const user = event.context.user as {
    name: string;
    id: string;
    image: string | null;
  };

  const { name, image } = body.data;

  let savedImage: string | null = user.image;

  // Case 1 & 2: New image added or existing image replaced
  if (image && typeof image === "string") {
    // Remove old image if one exists
    if (user.image) {
      const { success, error } = await removeUserImage(user.image);
      if (!success) {
        throw createError({
          statusCode: 500,
          statusMessage: error?.message || "Failed to remove old user image",
        });
      }
    }

    // Save new image
    const { data, error } = await saveUserImage(user.id, image);
    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message,
      });
    }

    savedImage = data?.imageUrl || null;
  }

  // Case 3: Remove image (image is explicitly null)
  if (image === null && user.image) {
    const { success, error } = await removeUserImage(user.image);
    if (!success) {
      throw createError({
        statusCode: 500,
        statusMessage: error?.message || "Failed to remove user image",
      });
    }
    savedImage = null;
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: name ?? user.name,
      image: savedImage,
    },
  });

  return {
    name: updatedUser.name,
    image: updatedUser.image || null,
  };
});
