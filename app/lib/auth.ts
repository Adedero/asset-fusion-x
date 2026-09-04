import { createAuthClient } from "better-auth/vue";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "~~/server/lib/auth";

export const authClient = createAuthClient({
  // Node's fetch rejects relative URLs, so a plain relative baseURL (fine in the
  // browser) breaks any SSR-rendered request through this client. Only needed
  // server-side — the browser bundle tree-shakes this branch out entirely.
  baseURL: import.meta.server ? process.env.BETTER_AUTH_URL : undefined,
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
