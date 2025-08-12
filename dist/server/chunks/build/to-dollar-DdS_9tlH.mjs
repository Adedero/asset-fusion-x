function toDollar(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);
}

export { toDollar as t };
//# sourceMappingURL=to-dollar-DdS_9tlH.mjs.map
