import { d as defineEventHandler, b as getRouterParam, c as createError, p as prisma, r as readValidatedBody, e as removeFileByUrl, s as saveFile } from '../../../../../nitro/nitro.mjs';
import { B as BusinessProfileSchema } from '../../../../../_/schemas.mjs';
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
import 'zod';

const businessProfile_put = defineEventHandler(async (event) => {
  const accountId = getRouterParam(event, "accountId");
  if (!accountId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Account ID is required"
    });
  }
  const user = event.context.user;
  const isAccountMember = await prisma.accountUser.findFirst({
    where: { userId: user.id, financialAccountId: accountId }
  });
  if (!isAccountMember) {
    throw createError({
      statusCode: 403,
      statusMessage: "Not allowed"
    });
  }
  const body = await readValidatedBody(event, BusinessProfileSchema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message
    });
  }
  const { proofOfAddress, proofOfAddressExt, certificate, certificateExt } = body.data;
  const existingBusinessProfile = await prisma.businessProfile.findFirst({
    where: { financialAccountId: accountId }
  });
  let uploadedProofOfAddress = "";
  let uploadedCertificate = "";
  if (proofOfAddress) {
    if (existingBusinessProfile == null ? void 0 : existingBusinessProfile.proofOfAddress) {
      await removeFileByUrl(existingBusinessProfile.proofOfAddress);
    }
    const { data, error } = await saveFile({
      id: accountId,
      base64Data: proofOfAddress,
      extension: proofOfAddressExt,
      outputDir: `public/uploads/documents/business-profiles/${accountId}`
    });
    if (!data || error) {
      console.error(error);
      throw createError({
        statusCode: 400,
        statusMessage: "Failed to upload proof of address"
      });
    }
    uploadedProofOfAddress = data.url;
  }
  if (certificate) {
    if (existingBusinessProfile == null ? void 0 : existingBusinessProfile.certificate) {
      await removeFileByUrl(existingBusinessProfile.certificate);
    }
    const { data, error } = await saveFile({
      id: accountId,
      base64Data: certificate,
      extension: certificateExt,
      outputDir: `public/documents/business-profile/${accountId}`
    });
    if (!data || error) {
      throw createError({
        statusCode: 400,
        statusMessage: "Failed to upload business certificate"
      });
    }
    uploadedCertificate = data.url;
  }
  const businessProfile = await prisma.businessProfile.upsert({
    where: { financialAccountId: accountId },
    update: {
      ...body.data,
      proofOfAddress: uploadedProofOfAddress || null,
      proofOfAddressExt: proofOfAddressExt || null,
      certificate: uploadedCertificate || null,
      certificateExt: certificateExt || null,
      approved: false
    },
    create: {
      financialAccountId: accountId,
      ...body.data,
      proofOfAddress: uploadedProofOfAddress || null,
      proofOfAddressExt: proofOfAddressExt || null,
      certificate: uploadedCertificate || null,
      certificateExt: certificateExt || null,
      approved: false
    }
  });
  return businessProfile;
});

export { businessProfile_put as default };
//# sourceMappingURL=business-profile.put.mjs.map
