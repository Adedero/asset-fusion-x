import { auth } from "../lib/auth";

export default defineEventHandler(async (event) => {
  const requestUrl = getRequestURL(event);

  const isUserRoute = requestUrl.pathname.includes("/user");
  const isAdminRoute = requestUrl.pathname.includes("/admin");

  if (isUserRoute || isAdminRoute) {
    const expectedRoles: string[] = isAdminRoute
      ? ["admin"]
      : ["admin", "user"];
    const session = await auth.api.getSession(event);

    if (!session) {
      throw createError({
        statusCode: 401,
        statusMessage: "You must be logged in to access this resource."
      });
    }

    const role = session.user.role;

    if (!expectedRoles.includes(role)) {
      throw createError({
        statusCode: 403,
        statusMessage:
          "Access denied. You are not authorized to access this page",
        fatal: true
      });
    }

    event.context.user = session.user;
  }
});
