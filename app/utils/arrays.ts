/**
 * Group an array of objects by a given key.
 * @param {Array} items - The array of data.
 * @param {string} key - The field to group by.
 * @returns {Object} An object where keys are the group values and values are arrays of items.
 */
export function groupBy<T, K extends keyof T>(
  items: T[],
  key: K,
): Record<T[K] & PropertyKey, T[]> {
  return items.reduce(
    (acc, item) => {
      const groupKey = item[key] as T[K] & PropertyKey;
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(item);
      return acc;
    },
    {} as Record<T[K] & PropertyKey, T[]>,
  );
}

/**
 * Sort an array of objects by a given field and order.
 * @param {Array} items - The array of objects to sort.
 * @param {string} key - The field name to sort by.
 * @param {"asc"|"desc"} order - Sort order (ascending or descending).
 * @returns {Array} The sorted array.
 */
export function sortBy<T, K extends keyof T>(
  items: T[],
  key: K,
  order: "asc" | "desc" = "asc",
): T[] {
  return [...items].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (aValue === bValue) return 0;

    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    if (typeof aValue === "number" && typeof bValue === "number") {
      return order === "asc" ? aValue - bValue : bValue - aValue;
    }

    const aStr = String(aValue);
    const bStr = String(bValue);

    return order === "asc"
      ? aStr.localeCompare(bStr)
      : bStr.localeCompare(aStr);
  });
}
