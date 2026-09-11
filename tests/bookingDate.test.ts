import { describe, it, expect } from 'vitest';
import { mayBeBookedOn, formatIsoDateAsGermanDate } from '../app/utils/bookingDate';

const yesterday = '2026-09-10';
const today = '2026-09-11';
const tomorrow = '2026-09-12';

describe('mayBeBookedOn', () => {
  it('accepts a date that lies before the given day', () => {
    expect(mayBeBookedOn(yesterday, today)).toBe(true);
  });

  it('accepts the given day itself', () => {
    expect(mayBeBookedOn(today, today)).toBe(true);
  });

  it('rejects a date that lies after the given day', () => {
    expect(mayBeBookedOn(tomorrow, today)).toBe(false);
  });
});

describe('formatIsoDateAsGermanDate', () => {
  it('turns the ISO order into day, month, year with dots', () => {
    expect(formatIsoDateAsGermanDate('2026-07-31')).toBe('31.07.2026');
  });
});
