import z from "zod";
import { prisma } from "~~/server/lib/prisma";
import { reverseTransaction } from "~~/server/utils/transaction";
import type { EventContextUser } from "~~/shared/types/user.types";

export default defineEventHandler(async (event) => {
  const schema = z.object({
    approvalId: z.string({ message: "Approval ID is required" }),
    status: z.enum(["accepted", "rejected"], {
      message: "Status must either be 'accepted' or 'rejected'",
    }),
  });

  const query = await getValidatedQuery(event, schema.safeParse);

  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: query.error.issues[0].message,
    });
  }

  const user = event.context.user as EventContextUser;
  const { approvalId, status } = query.data;
  const { accountId, modRequestId } = getRouterParams(event);

  if (!accountId || !modRequestId) {
    throw createError({
      statusCode: 400,
      statusMessage: "No account or request ID found",
    });
  }

  // if status === 'rejected'
  // find the transaction and mark it as rejected

  const request = await prisma.jointAccountModRequest.findUniqueOrThrow({
    where: {
      id: modRequestId,
    },
  });

  const updated = await prisma.jointAccountModRequestApproval.update({
    where: {
      id: approvalId,
      approverId: user.id,
      jointAccountModRequestId: modRequestId,
      request: {
        financialAccountId: accountId,
      },
    },
    data: {
      status,
    },
  });

  if (status === "rejected" && request.transactionId) {
    await reverseTransaction(accountId, request.transactionId, "reversed");
    await prisma.jointAccountModRequest.delete({
      where: { id: modRequestId },
    });
  }

  return {
    approval: updated,
    message: "Status updated successfully",
  };
});
