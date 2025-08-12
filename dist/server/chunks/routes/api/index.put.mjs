import { d as defineEventHandler, r as readValidatedBody, c as createError, l as removeUserImage, m as saveUserImage, p as prisma } from '../../nitro/nitro.mjs';
import { z } from 'zod';
import 'node:path';
import 'fs/promises';
import 'axios';
import 'path';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:crypto';
import 'node:url';
import 'better-auth';
import 'better-auth/adapters/prisma';
import 'node:process';
import '@prisma/client/runtime/library';
import 'better-auth/plugins';
import 'nodemailer';
import '@iconify/utils';
import 'consola';
import 'ipx';

const index_put = defineEventHandler(async (event) => {
  const schema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    image: z.string().nullish()
  });
  const body = await readValidatedBody(event, schema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      message: body.error.issues[0].message
    });
  }
  const user = event.context.user;
  const { name, image } = body.data;
  let savedImage = user.image;
  if (image && typeof image === "string") {
    if (user.image) {
      const { success, error: error2 } = await removeUserImage(user.image);
      if (!success) {
        throw createError({
          statusCode: 500,
          statusMessage: (error2 == null ? void 0 : error2.message) || "Failed to remove old user image"
        });
      }
    }
    const { data, error } = await saveUserImage(user.id, image);
    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: error.message
      });
    }
    savedImage = (data == null ? void 0 : data.imageUrl) || null;
  }
  if (image === null && user.image) {
    const { success, error } = await removeUserImage(user.image);
    if (!success) {
      throw createError({
        statusCode: 500,
        statusMessage: (error == null ? void 0 : error.message) || "Failed to remove user image"
      });
    }
    savedImage = null;
  }
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: name != null ? name : user.name,
      image: savedImage
    }
  });
  return {
    name: updatedUser.name,
    image: updatedUser.image || null
  };
});

export { index_put as default };
//# sourceMappingURL=index.put.mjs.map
