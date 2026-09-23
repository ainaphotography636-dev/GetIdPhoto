export function formatPrice(
  amountCents: number,
  currency: string,
  locale: string = "en-US",
): string {
  const amount = amountCents / 100;
  const normalizedCurrency = currency.toUpperCase();
  const resolvedLocale =
    normalizedCurrency === "AED" ? "en-AE" : locale;

  return new Intl.NumberFormat(resolvedLocale, {
    style: "currency",
    currency: normalizedCurrency,
    currencyDisplay: normalizedCurrency === "AED" ? "code" : "symbol",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: Number.isInteger(amount) ? 0 : 2,
  }).format(amount);
}
