import { useAuthStore } from "~/stores/auth.store";
import { authClient } from "~/lib/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) {
    return;
  }

  const { fullPath } = to;

  const isUserRoute = fullPath.startsWith("/user");
  const isAdminRoute = fullPath.startsWith("/admin");

  if (isUserRoute || isAdminRoute) {
    const expectedRoles = isAdminRoute ? ["admin"] : ["admin", "user"];

    const { data } = await authClient.getSession();

    if (!data) {
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
