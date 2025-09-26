function round(value, decimals = 0) {
  if (!Number.isFinite(value)) return NaN;
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

export { round as r };
//# sourceMappingURL=round.mjs.map
