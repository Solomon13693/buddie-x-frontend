export const formatCurrency = (
  amount: number | string,
  currency: string = "USD"
): string => {
  const locale: string = typeof navigator !== 'undefined' ? navigator.language : 'en-NG';

  const effectiveLocale = currency === 'NGN' ? 'en-NG' : locale;

  const numberValue = typeof amount === "string" ? parseFloat(amount) : amount;

  return new Intl.NumberFormat(effectiveLocale, {
    style: "currency",
    currency,
  }).format(numberValue);
};
