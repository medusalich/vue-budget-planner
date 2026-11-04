/**
 * Tells whether a booking date falls in the given month.
 * Compares text, so both must be zero-padded: `YYYY-MM-DD` and `YYYY-MM`.
 */
export function isBookedInMonth(bookedOn: string, month: string): boolean {
  return bookedOn.startsWith(`${month}-`);
}

/**
 * Returns the month before the given one; from January it goes back to December of the
 * previous year. Expects and returns `YYYY-MM`, zero-padded.
 */
export function getPreviousMonth(month: string): string {
  const year = Number(month.slice(0, 4));
  const monthNumber = Number(month.slice(5, 7));

  if (monthNumber === 1) {
    return `${year - 1}-12`;
  }

  return `${year}-${String(monthNumber - 1).padStart(2, '0')}`;
}
