/**
 * Tells whether a booking date falls in the given month.
 * Compares text, so both must be zero-padded: `YYYY-MM-DD` and `YYYY-MM`.
 */

export function isBookedInMonth(bookedOn: string, month: string): boolean {
  return bookedOn.startsWith(`${month}-`);
}
