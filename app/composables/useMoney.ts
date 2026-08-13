/** Parses a user-entered amount into integer cents. Returns null if the input is not a valid amount. */
export function parseAmount(input: string): number | null {
  const normalized = input.trim().replace(',', '.');
  if (normalized === '') {
    return null;
  }

  const amount = Number(normalized);
  if (Number.isNaN(amount) || amount < 0) {
    return null;
  }

  return Math.round(amount * 100);
}
