import z from "zod";
import { notificationEmitter } from "~~/server/events/notifications/emitter";
import { prisma } from "~~/server/lib/prisma";
import type { EventContextUser } from "~~/shared/types/user.types";

const DUPLICATE_TRANSACTION_CHECK_TIME = 3 * 60 * 1000;

export default defineEventHandler(async (event) => {
  const schema = z.object({
    amount: z.number(),
    currency: z.string(),
    USDAmount: z.number(),
    rate: z.number(),
    type: z.literal("deposit"),
    financialAccountId: z.string(),
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

  const user = event.context.user as EventContextUser;

  const { amount, currency, USDAmount, rate, type, financialAccountId } = data;

  const accountUser = await prisma.accountUser.findFirst({
    where: { userId: user.id, financialAccountId },
  });

  if (!accountUser) {
    throw createError({
      statusCode: 403,
      statusMessage: "You do not permission to make this deposit",
    });
  }

  const lastDepositRequest = await prisma.transaction.findFirst({
    where: {
      financialAccountId,
      type: "deposit",
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

  const selectedCurrency = await prisma.currency.findUnique({
    where: { symbol: currency },
    select: {
      name: true,
      symbol: true,
      walletAddress: true,
      walletAddressNetwork: true,
    },
  });

  if (!selectedCurrency) {
    throw createError({
      statusCode: 404,
      statusMessage: "Currency not found",
    });
  }

  const financialAccount = await prisma.financialAccount.findUniqueOrThrow({
    where: { id: financialAccountId },
  });

  const transaction = await prisma.transaction.create({
    data: {
      amount,
      USDAmount,
      currency,
      rate,
      financialAccountId,
      type,
      initiatorAccountId: accountUser.id,
      status: "pending",
      depositWalletAddress: selectedCurrency.walletAddress,
      depositWalletAddressNetwork: selectedCurrency.walletAddressNetwork,
      description: `Deposit to ${financialAccount.name} account`,
    },
  });

  await prisma.financialAccount.update({
    where: { id: financialAccount.id },
    data: {
      totalTransactions: {
        increment: 1,
      },
      firstTransactionAt: financialAccount.firstTransactionAt ?? new Date(),
      lastTransactionAt: new Date(),
    },
  });

  setResponseStatus(event, 201);

  notificationEmitter.emit("deposit:create", {
    user,
    data: {
      transaction,
      account: financialAccount,
    },
  });

  return {
    message: "Deposit request transaction created",
    transaction,
  };
});
