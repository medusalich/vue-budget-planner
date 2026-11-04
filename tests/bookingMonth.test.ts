import { describe, it, expect } from 'vitest';
import { isBookedInMonth } from '../app/utils/bookingMonth';

describe('isBookedInMonth', () => {
  it.each(['2026-11-01', '2026-11-30'])('counts %s as part of November 2026', (bookedOn) => {
    expect(isBookedInMonth(bookedOn, '2026-11')).toBe(true);
  });

  it.each(['2026-10-31', '2026-12-01'])('does not count %s as part of November 2026', (bookedOn) => {
    expect(isBookedInMonth(bookedOn, '2026-11')).toBe(false);
  });
});
