import { auth } from "../lib/auth";

export default defineEventHandler(async (event) => {
  const requestUrl = getRequestURL(event);

  const isUserRoute = requestUrl.pathname.includes("/user");
  const isAdminRoute = requestUrl.pathname.includes("/admin");

  if (isUserRoute || isAdminRoute) {
    const expectedRole = isAdminRoute ? "admin" : "user";
    const session = await auth.api.getSession(event);

    if (!session) {
      throw createError({
        statusCode: 401,
        message: "You must be logged in to access this resource.",
      });
    }

    if (session.user.role !== expectedRole) {
      throw createError({
        statusCode: 403,
        message: `Access denied. You must be logged in as a ${expectedRole}.`,
      });
    }

    event.context.user = session.user;
  }
});
