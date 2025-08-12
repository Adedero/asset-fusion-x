export default function conditional(
  condition: boolean,
  returnString: { if: unknown; else: unknown },
) {
  if (condition) return String(returnString.if);
  else return String(returnString.else);
}
