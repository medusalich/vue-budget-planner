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

/**
 * Returns the month after the given one; from December it goes on to January of the
 * next year. Expects and returns `YYYY-MM`, zero-padded.
 */
export function getNextMonth(month: string): string {
  const year = Number(month.slice(0, 4));
  const monthNumber = Number(month.slice(5, 7));

  if (monthNumber === 12) {
    return `${year + 1}-01`;
  }

  return `${year}-${String(monthNumber + 1).padStart(2, '0')}`;
}

/**
 * Writes a `YYYY-MM` month as German text, e.g. `'2026-07'` as `'Juli 2026'`.
 * Uses a fixed list of names instead of `Intl`, so no `Date` and no time zone are involved.
 */
const GERMAN_MONTH_NAMES = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
];

export function formatIsoMonthAsGermanMonth(month: string): string {
  const year = month.slice(0, 4);
  const monthNumber = Number(month.slice(5, 7));

  return `${GERMAN_MONTH_NAMES[monthNumber - 1]} ${year}`;
}
