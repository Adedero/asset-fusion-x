import { d as defineEventHandler, p as prisma, c as createError, v as checkUserKycApproval, r as readValidatedBody, w as checkBusinessProfileApproval, x as getJointAccountModApprovals } from '../../../../nitro/nitro.mjs';
import z from 'zod';
import 'node:path';
import 'fs/promises';
import 'path';
import 'fs';
import 'winston';
import 'axios';
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

function round(value, decimals = 0) {
  if (!Number.isFinite(value)) return NaN;
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

const DUPLICATE_TRANSACTION_CHECK_TIME = 3 * 60 * 1e3;
const withdrawal_post = defineEventHandler(async (event) => {
  const user = event.context.user;
  const settings = await prisma.settings.findFirst();
  if (!settings || !settings.allowWithdrawals) {
    throw createError({
      statusCode: 500,
      statusMessage: "Withdrawals are not allowed at this time. Please, try again later."
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
    description: z.string().optional()
  });
  const { data, error, success } = await readValidatedBody(
    event,
    schema.safeParse
  );
  if (!success) {
    throw createError({
      statusCode: 400,
      statusMessage: error.issues[0].message
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
        gte: new Date(Date.now() - DUPLICATE_TRANSACTION_CHECK_TIME)
      }
    }
  });
  if (lastDepositRequest) {
    throw createError({
      statusCode: 400,
      statusMessage: "Possible duplicate deposit request detected. Please, wait a little before trying again."
    });
  }
  const [financialAccount, accountUser] = await Promise.all([
    prisma.financialAccount.findUniqueOrThrow({
      where: { id: financialAccountId }
    }),
    prisma.accountUser.findFirstOrThrow({
      where: { userId: user.id, financialAccountId }
    })
  ]);
  if (financialAccount.type === "business") {
    const res2 = await checkBusinessProfileApproval(financialAccount.id);
    if (!res2.success) throw createError(res2.error);
  }
  const totalAmountDeducted = round(USDAmount + (charges != null ? charges : 0), 2);
  const isJoint = financialAccount.ownership === "joint";
  const transactionResult = await prisma.$transaction(async (tx) => {
    var _a;
    let increment = 0;
    const withdrawal = await tx.transaction.create({
      data: {
        amount: data.amount,
        USDAmount: data.USDAmount,
        rate: data.rate,
        charges: data.charges,
        currency: data.currency,
        type: "withdrawal",
        status: "pending",
        description: (_a = data.description) != null ? _a : `Withdrawal from ${financialAccount.name} account`,
        withdrawalWalletAddress: data.withdrawalWalletAddress,
        withdrawalWalletAddressNetwork: data.withdrawalWalletAddressNetwork,
        bank: data.bank,
        bankAccount: data.accountNumber,
        financialAccountId,
        initiatorAccountId: accountUser.id
      }
    });
    increment += 1;
    let chargeTx = null;
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
          parentTransactionId: withdrawal.id
        }
      });
      increment += 1;
    }
    const updated = await tx.financialAccount.update({
      where: { id: financialAccountId },
      data: {
        balance: {
          decrement: totalAmountDeducted
        },
        totalTransactions: {
          increment
        },
        lastTransactionAt: /* @__PURE__ */ new Date()
      }
    });
    if (isJoint) {
      await tx.jointAccountModRequest.create({
        data: {
          creatorId: user.id,
          financialAccountId,
          type: "withdrawal",
          transactionId: withdrawal.id,
          description: `${user.name} initiated a withdrawal request of $${USDAmount.toLocaleString()}.`,
          approvals: {
            createMany: {
              data: await getJointAccountModApprovals(
                financialAccountId,
                user.id,
                tx
              ),
              skipDuplicates: true
            }
          }
        }
      });
    }
    return {
      withdrawal,
      chargeTx,
      updated
    };
  });
  return {
    message: "Withdrawal request created successfully",
    transaction: transactionResult.withdrawal,
    chargeTransaction: transactionResult.chargeTx
  };
});

export { withdrawal_post as default };
//# sourceMappingURL=withdrawal.post.mjs.map
