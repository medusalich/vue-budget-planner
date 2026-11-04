import { describe, it, expect } from 'vitest';
import {
  isBookedInMonth,
  getPreviousMonth,
  getNextMonth,
  formatIsoMonthAsGermanMonth,
} from '../app/utils/bookingMonth';

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

describe('getNextMonth', () => {
  it('goes forward one month within the same year', () => {
    expect(getNextMonth('2026-10')).toBe('2026-11');
  });

  it('goes forward from December to January of the next year', () => {
    expect(getNextMonth('2026-12')).toBe('2027-01');
  });
});

describe('formatIsoMonthAsGermanMonth', () => {
  it('writes the month name and year', () => {
    expect(formatIsoMonthAsGermanMonth('2026-11')).toBe('November 2026');
  });
});

it.each([
  { month: '2026-01', expected: 'Januar 2026' },
  { month: '2026-07', expected: 'Juli 2026' },
  { month: '2026-12', expected: 'Dezember 2026' },
])('writes $month as $expected', ({ month, expected }) => {
  expect(formatIsoMonthAsGermanMonth(month)).toBe(expected);
});
