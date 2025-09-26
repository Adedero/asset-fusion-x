import { createAuthClient } from "better-auth/vue";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "~~/server/lib/auth";

export const authClient = createAuthClient({
  fetchOptions: {
    onError: async (context) => {
      const { response } = context;
      if (response.status === 429) {
        const retryAfter = response.headers.get("X-Retry-After");

        createError({
          statusCode: response.status,
          statusMessage: `Too many tries. Retry after ${retryAfter} seconds`,
          fatal: true
        });
      }
    }
  },
  plugins: [adminClient(), inferAdditionalFields<typeof auth>()]
});

export type BetterAuthSession = typeof authClient.$Infer.Session.session;
export type BetterAuthUser = typeof authClient.$Infer.Session.user;
