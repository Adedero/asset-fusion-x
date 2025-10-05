/**
 * Robust rounding function
 * @param value number to round
 * @param decimals optional decimal places (default = 2)
 * @returns rounded number
 */
export default function round(value: number, decimals: number = 2): number {
  if (!Number.isFinite(value)) {
    return NaN;
  }
  if (!Number.isInteger(decimals) || decimals < 0) {
    throw new Error("Decimals must be a non-negative integer");
  }

  const factor = Math.pow(10, decimals);
  return Math.round((value + Number.EPSILON) * factor) / factor;
}
