/** Negative input is rejected - amounts in this application are always positive. */
export function parseAmountToCents(input: string): number | null {
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
