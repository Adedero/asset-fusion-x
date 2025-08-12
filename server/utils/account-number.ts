type AccountType = "personal" | "business";
type Ownership = "single" | "joint";

function getPrefix(accountType: AccountType, ownership: Ownership): string {
  const typeMap: Record<AccountType, string> = {
    personal: "1",
    business: "2",
  };

  const ownershipMap: Record<Ownership, string> = {
    single: "3",
    joint: "4",
  };

  return typeMap[accountType] + ownershipMap[ownership];
}

function generateSecureRandomDigits(length: number): string {
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);

  return Array.from(randomValues)
    .map((n) => (n % 10).toString())
    .join("");
}

export function generateAccountNumber(
  accountType: AccountType,
  ownership: Ownership,
  totalLength = 10,
): string {
  const prefix = getPrefix(accountType, ownership);
  const randomLength = totalLength - prefix.length;
  const randomPart = generateSecureRandomDigits(randomLength);
  return prefix + randomPart;
}
