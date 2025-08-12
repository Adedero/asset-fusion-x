import z from "zod";
import type { Transaction } from "~~/server/generated/prisma/client";
import { prisma } from "~~/server/lib/prisma";
import {
  checkBusinessProfileApproval,
  checkUserKycApproval,
} from "~~/server/utils/accound-validation";
import type { EventContextUser } from "~~/shared/types/user.types";
import round from "~~/shared/helpers/round";
import { getJointAccountModApprovals } from "~~/server/utils/joint-account";

const DUPLICATE_TRANSACTION_CHECK_TIME = 3 * 60 * 1000;

export default defineEventHandler(async (event) => {
  const user = event.context.user as EventContextUser;
  const settings = await prisma.settings.findFirst();

  if (!settings || !settings.allowWithdrawals) {
    throw createError({
      statusCode: 500,
      statusMessage:
        "Withdrawals are not allowed at this time. Please, try again later.",
    });
  }

  const res = await checkUserKycApproval(user.id);

  if (!res.success) {
    throw createError(res.error);
  }

  const schema = z.object({
    amount: z.number(),
    currency: z.string(),
    USDAmount: z.number(),
    rate: z.number(),
    type: z.literal("withdrawal"),
    financialAccountId: z.string(),
    charges: z.number(),
    withdrawalWalletAddress: z.string().optional(),
    withdrawalWalletAddressNetwork: z.string().optional(),
    bank: z.string().optional(),
    accountNumber: z.string().optional(),
    description: z.string().optional(),
  });

  const { data, error, success } = await readValidatedBody(
    event,
    schema.safeParse,
  );

  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: error.issues[0].message,
    });
  }

  const { charges, financialAccountId, USDAmount } = data;

  const lastDepositRequest = await prisma.transaction.findFirst({
    where: {
      financialAccountId,
      type: "withdrawal",
      status: "pending",
      USDAmount,
      createdAt: {
        gte: new Date(Date.now() - DUPLICATE_TRANSACTION_CHECK_TIME),
      },
    },
  });

  if (lastDepositRequest) {
    throw createError({
      statusCode: 400,
      statusMessage:
        "Possible duplicate deposit request detected. Please, wait a little before trying again.",
    });
  }

  const [financialAccount, accountUser] = await Promise.all([
    prisma.financialAccount.findUniqueOrThrow({
      where: { id: financialAccountId },
    }),
    prisma.accountUser.findFirstOrThrow({
      where: { userId: user.id, financialAccountId },
    }),
  ]);

  if (financialAccount.type === "business") {
    const res = await checkBusinessProfileApproval(financialAccount.id);
    if (!res.success) throw createError(res.error);
  }

  const totalAmountDeducted = round(USDAmount + (charges ?? 0), 2);

  // create transaction for amount
  // deduct transaction USD Amount from balance
  // create transaction for charge
  // deduct charge amount from account balance
  // if financial account is joint, create request.

  const isJoint = financialAccount.ownership === "joint";

  // Wrap in transaction to ensure atomicity
  const transactionResult = await prisma.$transaction(async (tx) => {
    // 1. Create withdrawal transaction
    let increment: number = 0;
    const withdrawal = await tx.transaction.create({
      data: {
        amount: data.amount,
        USDAmount: data.USDAmount,
        rate: data.rate,
        charges: data.charges,
        currency: data.currency,
        type: "withdrawal",
        status: "pending",
        description:
          data.description ??
          `Withdrawal from ${financialAccount.name} account`,
        withdrawalWalletAddress: data.withdrawalWalletAddress,
        withdrawalWalletAddressNetwork: data.withdrawalWalletAddressNetwork,
        bank: data.bank,
        bankAccount: data.accountNumber,
        financialAccountId,
        initiatorAccountId: accountUser.id,
      },
    });

    increment += 1;

    // 2. Create transaction for charges if applicable
    let chargeTx: Transaction | null = null;
    if (charges && charges > 0) {
      chargeTx = await tx.transaction.create({
        data: {
          amount: charges,
          USDAmount: charges,
          rate: 1,
          currency: "USD",
          type: "withdrawal",
          status: "successfull",
          description: "Withdrawal charge",
          financialAccountId,
          initiatorAccountId: accountUser.id,
          parentTransactionId: withdrawal.id,
        },
      });

      increment += 1;
    }

    // 3. Deduct balance
    const updated = await tx.financialAccount.update({
      where: { id: financialAccountId },
      data: {
        balance: {
          decrement: totalAmountDeducted,
        },
        totalTransactions: {
          increment,
        },
        lastTransactionAt: new Date(),
      },
    });

    // 4. If joint, create mod request
    if (isJoint) {
      await tx.jointAccountModRequest.create({
        data: {
          creatorId: user.id,
          financialAccountId,
          type: "withdrawal",
          transactionId: withdrawal.id,
          description: `${
            user.name
          } initiated a withdrawal request of $${USDAmount.toLocaleString()}.`,
          approvals: {
            createMany: {
              data: await getJointAccountModApprovals(
                financialAccountId,
                user.id,
                tx,
              ),
              skipDuplicates: true,
            },
          },
        },
      });
    }

    return {
      withdrawal,
      chargeTx,
      updated,
    };
  });

  return {
    message: "Withdrawal request created successfully",
    transaction: transactionResult.withdrawal,
    chargeTransaction: transactionResult.chargeTx,
  };
});
