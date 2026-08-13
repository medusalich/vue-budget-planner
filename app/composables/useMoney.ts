/** Parses a user-entered amount into integer cents. Returns null if the input is not a valid amount. */
export function parseAmount(input: string): number | null {
  const normalized = input.replace(',', '.');
  const amount = Number(normalized);

  return Math.round(amount * 100);
}
