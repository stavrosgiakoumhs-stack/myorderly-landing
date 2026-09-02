export function formatEuro(value: number): string {
  const formatted = value.toFixed(2).replace(".", ",");
  return `${formatted}€`;
}
