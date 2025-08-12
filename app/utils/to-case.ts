export default function toCase(
  input: string,
  style: "sentence" | "upper" | "lower" | "pascal" | "snake",
): string {
  const words = input
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .split(" ")
    .filter(Boolean); // remove empty strings

  switch (style) {
    case "sentence":
      if (words.length === 0) return "";
      return (
        (words[0]?.charAt(0).toUpperCase() ?? "") +
        (words[0]?.slice(1) ?? "") +
        (words.length > 1 ? " " + words.slice(1).join(" ") : "")
      );

    case "upper":
      return input.toUpperCase();

    case "lower":
      return input.toLowerCase();

    case "pascal":
      return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join("");

    case "snake":
      return words.join("_");

    default:
      throw new Error(`Unsupported case style: ${style}`);
  }
}
