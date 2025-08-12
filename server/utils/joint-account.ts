import type { JointAccountRequestStatus } from "../generated/prisma/enums";
import type { TransactionClient } from "../generated/prisma/internal/prismaNamespace";
import { prisma } from "../lib/prisma";

export async function getJointAccountModApprovals(
  financialAccountId: string,
  creatorId: string,
  tx?: TransactionClient,
): Promise<{ approverId: string; status: JointAccountRequestStatus }[]> {
  const client = tx ?? prisma;

  const accountUsers = await client.accountUser.findMany({
    where: {
      financialAccountId,
    },
    include: {
      user: {
        select: {
          id: true,
        },
      },
    },
  });

  return accountUsers.map((accountUser) => {
    const { user } = accountUser;
    return {
      approverId: user.id,
      status:
        !!accountUser.autosign || user.id === creatorId
          ? "accepted"
          : "pending",
    };
  });
}
