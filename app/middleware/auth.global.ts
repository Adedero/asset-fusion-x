import { useAuthStore } from "~/stores/auth.store";
import { authClient } from "~/lib/auth";
import normalizeException from "~~/shared/helpers/normalize-exception";

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) {
    return;
  }

  const { fullPath } = to;

  const isUserRoute = fullPath.startsWith("/user");
  const isAdminRoute = fullPath.startsWith("/admin");

  if (isUserRoute || isAdminRoute) {
    const expectedRoles = isAdminRoute ? ["admin"] : ["admin", "user"];

    const { data, error } = await authClient.getSession();

    if (!data) {
      // A non-401 error here (e.g. an IP ban) means the session lookup was
      // actively rejected rather than just missing, so surface why instead
      // of silently bouncing to sign-in as if the user were merely logged out.
      if (error && error.status !== 401) {
        const message = normalizeException(error).message;
        return navigateTo(
          `/sign-in?redirect=${encodeURIComponent(fullPath)}&error=${encodeURIComponent(message)}`
        );
      }
      return navigateTo(`/sign-in?redirect=${encodeURIComponent(fullPath)}`);
    }

    const role = data.user.role;

    if (!expectedRoles.includes(role)) {
      return navigateTo("/sign-in");
    }

    const authStore = useAuthStore();
    authStore.setUser(data.user);
    authStore.setSession(data.session);
  }
});
