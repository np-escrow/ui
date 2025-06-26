const currencySymbols = {
  USD: "$",
  EUR: "€",
  UAH: "₴"
} as const;

export const formatPriceValue = (
  value: number,
  currency: keyof typeof currencySymbols = "USD"
): string => {
  const formattedValue = value.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    useGrouping: true
  });

  return `${currencySymbols[currency]}${formattedValue}`;
};
