import { d as defineEventHandler, r as readValidatedBody, c as createError, p as prisma, e as removeFileByUrl, s as saveFile } from '../../../../nitro/nitro.mjs';
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

const kyc_put = defineEventHandler(async (event) => {
  const user = event.context.user;
  const schema = z.object({
    governmentId: z.string().min(1, "ID file (base64) is required"),
    governmentIdType: z.enum(
      ["international_passport", "driving_license", "national_id"],
      {
        message: "Select a valid ID type"
      }
    ),
    governmentIdExt: z.string().min(1, "File extension is required")
  });
  const body = await readValidatedBody(event, schema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message
    });
  }
  const { governmentId, governmentIdType, governmentIdExt } = body.data;
  const existingProfile = await prisma.profile.findUnique({
    where: { userId: user.id },
    select: { governmentId: true }
  });
  if (!existingProfile) {
    throw createError({
      statusCode: 404,
      statusMessage: "Profile not found"
    });
  }
  if (existingProfile.governmentId) {
    await removeFileByUrl(existingProfile.governmentId);
  }
  const { data, error } = await saveFile({
    id: user.id,
    base64Data: governmentId,
    extension: governmentIdExt,
    outputDir: `public/uploads/documents/users`
  });
  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: error.message
    });
  }
  const updatedProfile = await prisma.profile.update({
    where: { userId: user.id },
    data: {
      governmentId: data == null ? void 0 : data.url,
      governmentIdType,
      governmentIdExt,
      kycStatus: "pending"
    }
  });
  return {
    message: "Government ID uploaded successfully",
    profile: updatedProfile
  };
});

export { kyc_put as default };
//# sourceMappingURL=kyc.put.mjs.map
