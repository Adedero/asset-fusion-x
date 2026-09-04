import { isValidIP, normalizeIP } from "@better-auth/core/utils";
import type { H3Event } from "h3";

/**
 * Mirrors better-auth's own IP resolution (see better-auth/dist/utils/get-request-ip.mjs)
 * so the IP stored on Session rows and the IP checked here always agree.
 */
export function getClientIp(event: H3Event): string | null {
  const forwarded = getRequestHeader(event, "x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0].trim();
    if (isValidIP(ip)) return normalizeIP(ip);
  }
  if (process.env.NODE_ENV !== "production") return "127.0.0.1";
  return null;
}
