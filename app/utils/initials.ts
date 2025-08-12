export default function initials(name: string): string {
  if (!name) return "";

  const names = name.split(" ");
  if (names.length === 1) {
    return names[0]?.charAt(0)?.toUpperCase() ?? "";
  }

  const firstInitial = names[0]?.charAt(0)?.toUpperCase() ?? "";
  const lastInitial = names[names.length - 1]?.charAt(0)?.toUpperCase() ?? "";

  return `${firstInitial}${lastInitial}`;
}
