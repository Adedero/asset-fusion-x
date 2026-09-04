import { prisma } from "../lib/prisma";
import { getClientIp } from "../lib/get-client-ip";

// Flip to true once you want banned IPs to still be able to browse
// the public marketing site (app/pages/(main)/**).
const EXEMPT_MARKETING_PAGES = false;
const APP_PATH_PREFIXES = [
  "/admin",
  "/user",
  "/api",
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
  "/email-verification",
  "/token-validation",
  "/change-email"
];

export default defineEventHandler(async (event) => {
  const { pathname } = getRequestURL(event);
  if (pathname.startsWith("/_")) return;

  if (
    EXEMPT_MARKETING_PAGES &&
    !APP_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  ) {
    return;
  }

  const ip = getClientIp(event);
  if (!ip) return;

  const ban = await prisma.bannedIp.findUnique({ where: { ipAddress: ip } });
  if (ban && (!ban.expiresAt || ban.expiresAt > new Date())) {
    throw createError({
      statusCode: 403,
      statusMessage: `Your IP address has been banned. Reason: ${ban.reason}`,
      fatal: true
    });
  }
});
