import { createAuthClient } from 'better-auth/vue';
import { adminClient } from 'better-auth/client/plugins';
import { N as createError } from './server.mjs';

const authClient = createAuthClient({
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
  plugins: [adminClient()]
});

export { authClient as a };
//# sourceMappingURL=auth-ClryBvqZ.mjs.map
