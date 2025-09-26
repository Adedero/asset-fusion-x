function initials(name) {
  if (!name) return "";
  const names = name.split(" ");
  if (names.length === 1) {
    return names[0]?.charAt(0)?.toUpperCase() ?? "";
  }
  const firstInitial = names[0]?.charAt(0)?.toUpperCase() ?? "";
  const lastInitial = names[names.length - 1]?.charAt(0)?.toUpperCase() ?? "";
  return `${firstInitial}${lastInitial}`;
}

export { initials as i };
//# sourceMappingURL=initials-LMkSR82P.mjs.map
