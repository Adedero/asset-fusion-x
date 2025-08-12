export default function useConsole(...values: MaybeRefOrGetter[]) {
  watchEffect(() => {
    const unwrapped = values.map((v) => toValue(v));
    console.log(...unwrapped);
  });
}
