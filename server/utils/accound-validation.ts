import type { BusinessProfile, Profile } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";

export type ValidationResult<T = unknown> =
  | {
      success: true;
      data: T;
      error: null;
    }
  | {
      success: false;
      data: null;
      error: ValidationError;
    };

export type ValidationError = {
  statusCode: number;
  statusMessage: string;
};

export async function checkUserKycApproval(
  userId: string,
): Promise<ValidationResult<Profile>> {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    return {
      data: null,
      error: {
        statusCode: 400,
        statusMessage:
          "This action could not be completed because your profile information is incomplete.",
      },
      success: false,
    };
  }

  if (!profile.kycStatus || profile.kycStatus === "resubmit") {
    return {
      data: null,
      success: false,
      error: {
        statusCode: 400,
        statusMessage:
          "You must verify your identity to continue. Go to 'profile' > 'KYC' to begin verification.",
      },
    };
  }

  if (profile.kycStatus === "pending") {
    return {
      data: null,
      success: false,
      error: {
        statusCode: 400,
        statusMessage:
          "Your KYC verification is still pending. Please try again later. ",
      },
    };
  }

  if (profile.kycStatus === "rejected") {
    return {
      data: null,
      success: false,
      error: {
        statusCode: 400,
        statusMessage:
          "Your KYC verification has been rejected. Please, contact the admin.",
      },
    };
  }

  return {
    success: true,
    data: profile,
    error: null,
  };
}

export async function checkBusinessProfileApproval(
  accountId: string,
): Promise<ValidationResult<BusinessProfile>> {
  const businessProfile = await prisma.businessProfile.findUnique({
    where: { financialAccountId: accountId },
  });

  if (!businessProfile) {
    return {
      success: false,
      data: null,
      error: {
        statusCode: 400,
        statusMessage:
          "This action could not be completed because your business profile information is incomplete.",
      },
    };
  }

  if (!businessProfile.approved) {
    return {
      success: false,
      data: null,
      error: {
        statusCode: 400,
        statusMessage:
          "Your business profile has not yet been approved. Please, try again later.",
      },
    };
  }

  return {
    success: true,
    data: businessProfile,
    error: null,
  };
}
