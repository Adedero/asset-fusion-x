import { prisma } from "~~/server/lib/prisma";
import { paginationQuerySchema } from "~~/shared/schemas";
import { z } from "zod";

export default defineEventHandler(async (event) => {
  const schema = z.object({
    ...paginationQuerySchema.shape,
    approved: z.coerce.boolean().optional()
  });

  const query = await getValidatedQuery(event, schema.safeParse);

  if (!query.success) {
    throw createError({
      statusCode: 400,
      statusMessage: query.error.issues[0].message
    });
  }
  const { search = "", approved, page = 0, limit } = query.data;

  const profiles = await prisma.businessProfile.findMany({
    where: {
      AND: [
        { account: { name: { contains: search } } },
        approved ? { approved } : {}
      ]
    },
    select: {
      id: true,
      address: true,
      creationMonth: true,
      creationYear: true,
      proofOfAddress: true,
      proofOfAddressExt: true,
      certificate: true,
      certificateExt: true,
      approved: true,
      createdAt: true,
      account: {
        select: {
          name: true
        }
      }
    },
    skip: page * (limit ?? 0),
    take: limit,
    orderBy: {
      account: {
        name: "asc"
      }
    }
  });

  return profiles.map((profile) => ({
    ...profile,
    financialAccountName: profile.account.name,
    account: undefined
  }));
});
