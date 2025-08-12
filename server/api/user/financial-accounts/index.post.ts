import z from "zod";
import { notificationEmitter } from "~~/server/events/notifications/emitter";
import { prisma } from "~~/server/lib/prisma";
import { generateAccountNumber } from "~~/server/utils/account-number";
import type { EventContextUser } from "~~/shared/types/user.types";

export default defineEventHandler(async (event) => {
  const schema = z.object({
    accountName: z.string().min(3, { message: "Account name is required." }),
    accountType: z.enum(["personal", "business"], {
      message: "Account type must either be personal or business",
    }),
    accountOwnership: z.enum(["single", "joint"], {
      message: "Account ownership must either be single or joint",
    }),
    jointOwnershipRole: z
      .enum([
        "owner",
        "co_owner",
        "manager",
        "admin",
        "accountant",
        "investor",
        "contributor",
        "legal_guardian",
        "signatory",
      ])
      .optional(),
    jointOwnership: z
      .number()
      .nonnegative({ message: "Ownership cannot be negative" })
      .max(100, { message: "Ownership cannot be more than 100%" })
      .optional(),
  });

  const body = await readValidatedBody(event, schema.safeParse);

  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message,
    });
  }

  const user = event.context.user as EventContextUser;

  const MAX_ACCOUNTS = parseInt(process.env.MAX_ACCOUNTS ?? "20");

  //Check if user has 20 account already
  const accountMemberships = await prisma.accountUser.count({
    where: { userId: user.id },
  });

  if (accountMemberships === MAX_ACCOUNTS) {
    throw createError({
      statusCode: 400,
      statusMessage: `You cannot create more than ${MAX_ACCOUNTS} accounts.`,
    });
  }

  const {
    accountName,
    accountOwnership,
    accountType,
    jointOwnership,
    jointOwnershipRole,
  } = body.data;

  const financialAccount = await prisma.financialAccount.create({
    data: {
      creatorId: user.id,
      name: accountName,
      number: generateAccountNumber(accountType, accountOwnership),
      status: "active",
      type: accountType,
      ownership: accountOwnership,
    },
  });

  await prisma.accountUser.create({
    data: {
      userId: user.id,
      financialAccountId: financialAccount.id,
      role: accountOwnership === "single" ? "owner" : jointOwnershipRole,
      ownership: accountOwnership === "single" ? 100 : jointOwnership,
    },
  });

  notificationEmitter.emit("financial-account:create", {
    user,
    data: {
      account: financialAccount,
    },
  });

  return {
    success: true,
    statusMessage: "Account created successfully",
  };
});
