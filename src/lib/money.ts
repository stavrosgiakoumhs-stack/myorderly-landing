/** Landing/marketing amounts (Greek decimal comma). */
export function formatEuro(value: number): string {
  const formatted = value.toFixed(2).replace(".", ",");
  return `${formatted}€`;
}

/** Production product UI uses `Number(value).toFixed(2)`. */
export function formatAmount(value: number): string {
  return Number(value).toFixed(2);
}

export function formatAmountEuro(value: number): string {
  return `${formatAmount(value)}€`;
}
