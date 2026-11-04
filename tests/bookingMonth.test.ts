import { describe, it, expect } from 'vitest';
import { isBookedInMonth, getPreviousMonth } from '../app/utils/bookingMonth';

describe('isBookedInMonth', () => {
  it.each(['2026-11-01', '2026-11-30'])('counts %s as part of November 2026', (bookedOn) => {
    expect(isBookedInMonth(bookedOn, '2026-11')).toBe(true);
  });

  it.each(['2026-10-31', '2026-12-01'])('does not count %s as part of November 2026', (bookedOn) => {
    expect(isBookedInMonth(bookedOn, '2026-11')).toBe(false);
  });
});

describe('getPreviousMonth', () => {
  it('goes back one month within the same year', () => {
    expect(getPreviousMonth('2026-11')).toBe('2026-10');
  });

  it('goes back from January to December of the previous year', () => {
    expect(getPreviousMonth('2026-01')).toBe('2025-12');
  });
});
