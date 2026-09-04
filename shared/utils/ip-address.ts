/**
 * Validates if a string is a valid IPv4 or IPv6 address.
 * @param {string} ip
 * @returns {boolean}
 */
export function isValidIP(ip: string): boolean {
  // IPv4 regex (matches 0.0.0.0 to 255.255.255.255, no leading zeros)
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  // IPv6 regex (matches standard, omitted, and mixed IPv4-mapped IPv6 formats)
  const ipv6Regex =
    /^(?:(?:[0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,7}:|(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,5}(?::[0-9a-fA-F]{1,4}){1,2}|(?:[0-9a-fA-F]{1,4}:){1,4}(?::[0-9a-fA-F]{1,4}){1,3}|(?:[0-9a-fA-F]{1,4}:){1,3}(?::[0-9a-fA-F]{1,4}){1,4}|(?:[0-9a-fA-F]{1,4}:){1,2}(?::[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:(?:(?::[0-9a-fA-F]{1,4}){1,6})|:(?:(?::[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(?::[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(?:ffff(?::0{1,4}){0,1}:){0,1}(?:(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9])|(?:[0-9a-fA-F]{1,4}:){1,4}:(?:(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

/**
 * Normalizes an IP address.
 * Strips whitespace, converts IPv6 to lowercase, expands shorthand IPv6,
 * extracts clean IPv4 from IPv4-mapped IPv6 addresses (e.g., ::ffff:127.0.0.1),
 * and preserves IPv6 zone IDs (e.g., fe80::1%eth0).
 * @param {string} ip
 * @returns {string|null} Normalized IP or null if invalid
 */
export function normalizeIP(ip: string): string | null {
  if (typeof ip !== "string") return null;
  const cleanIp = ip.trim().toLowerCase();
  if (!isValidIP(cleanIp)) return null;

  // Split off the zone ID, if present, before doing any address processing
  const zoneIndex = cleanIp.indexOf("%");
  const zoneId = zoneIndex !== -1 ? cleanIp.slice(zoneIndex) : "";
  const addr = zoneIndex !== -1 ? cleanIp.slice(0, zoneIndex) : cleanIp;

  // 1. Handle IPv4-mapped IPv6 addresses (e.g., "::ffff:192.168.1.1")
  if (addr.startsWith("::ffff:") && addr.includes(".")) {
    return addr.split("::ffff:")[1] ?? null;
  }

  // 2. Return standard IPv4 as-is
  if (!addr.includes(":")) {
    return addr;
  }

  // 3. Fully expand IPv6 addresses (e.g., "2001:db8::1" -> "2001:0db8:0000:0000:0000:0000:0000:0001")
  const parts = addr.split("::");
  if (parts.length > 2) return null; // Invalid structure

  let left: string[];
  const right = parts[1] ? parts[1].split(":") : [];

  if (parts.length === 2) {
    left = parts[0] ? parts[0].split(":") : [];
    const missingCount = 8 - (left.length + right.length);
    const middle = new Array(missingCount).fill("0000");
    left = left.concat(middle).concat(right);
  } else {
    left = parts?.[0]?.split(":") ?? [];
  }

  // Pad each segment to 4 characters, then reattach the zone ID
  const expanded = left.map((part) => part.padStart(4, "0")).join(":");
  return expanded + zoneId;
}
