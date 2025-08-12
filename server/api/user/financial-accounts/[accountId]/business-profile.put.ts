import { prisma } from "~~/server/lib/prisma";
import { removeFileByUrl, saveFile } from "~~/server/utils/file-manager";
import { BusinessProfileSchema } from "~~/shared/schemas";
import type { EventContextUser } from "~~/shared/types/user.types";

export default defineEventHandler(async (event) => {
  const accountId = getRouterParam(event, "accountId");

  if (!accountId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Account ID is required",
    });
  }

  const user = event.context.user as EventContextUser;

  const isAccountMember = await prisma.accountUser.findFirst({
    where: { userId: user.id, financialAccountId: accountId },
  });

  if (!isAccountMember) {
    throw createError({
      statusCode: 403,
      statusMessage: "Not allowed",
    });
  }

  const body = await readValidatedBody(event, BusinessProfileSchema.safeParse);

  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message,
    });
  }

  const { proofOfAddress, proofOfAddressExt, certificate, certificateExt } =
    body.data;

  const existingBusinessProfile = await prisma.businessProfile.findFirst({
    where: { financialAccountId: accountId },
  });

  let uploadedProofOfAddress: string = "";
  let uploadedCertificate: string = "";

  if (proofOfAddress) {
    if (existingBusinessProfile?.proofOfAddress) {
      await removeFileByUrl(existingBusinessProfile.proofOfAddress);
    }
    const { data, error } = await saveFile({
      id: accountId,
      base64Data: proofOfAddress,
      extension: proofOfAddressExt!,
      outputDir: `public/uploads/documents/business-profiles/${accountId}`,
    });

    if (!data || error) {
      console.error(error);

      throw createError({
        statusCode: 400,
        statusMessage: "Failed to upload proof of address",
      });
    }

    uploadedProofOfAddress = data.url;
  }

  if (certificate) {
    if (existingBusinessProfile?.certificate) {
      await removeFileByUrl(existingBusinessProfile.certificate);
    }
    const { data, error } = await saveFile({
      id: accountId,
      base64Data: certificate,
      extension: certificateExt!,
      outputDir: `public/documents/business-profile/${accountId}`,
    });

    if (!data || error) {
      throw createError({
        statusCode: 400,
        statusMessage: "Failed to upload business certificate",
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
      approved: false,
    },
    create: {
      financialAccountId: accountId,
      ...body.data,
      proofOfAddress: uploadedProofOfAddress || null,
      proofOfAddressExt: proofOfAddressExt || null,
      certificate: uploadedCertificate || null,
      certificateExt: certificateExt || null,
      approved: false,
    },
  });

  return businessProfile;
});
