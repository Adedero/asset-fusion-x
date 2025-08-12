/* import { authClient } from "~/lib/auth";
import { useAuthStore } from "~/stores/auth.store"; */

export default defineNuxtRouteMiddleware((to) => {
  /*   if (import.meta.client) {
    const { fullPath } = to;
    const isUserRoute = fullPath.startsWith("/user");
    const isAdminRoute = fullPath.startsWith("/admin");

    if (isUserRoute || isAdminRoute) {
      const expectedRole = isAdminRoute ? "admin" : "user";
      const session = authClient.useSession();

      console.log(session.value.data);

      if (!session.value.data) {
        return navigateTo(`/sign-in?redirect=${encodeURIComponent(fullPath)}`);
      }
      if (session.value.data.user.role !== expectedRole) {
        return navigateTo("/sign-in");
      }

      const authStore = useAuthStore();
      authStore.setUser(session.value.data.user);
      authStore.setSession(session.value.data.session);
    }
  } */
});
