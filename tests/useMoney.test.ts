import { describe, it, expect } from 'vitest';
import { formatCentsAsEuro, parseAmountToCents } from '../app/composables/useMoney';

describe('parseAmountToCents', () => {
  it('parses a comma as decimal separator', () => {
    expect(parseAmountToCents('12,50')).toBe(1250);
  });

  it('parses a dot as decimal separator', () => {
    expect(parseAmountToCents('12.50')).toBe(1250);
  });

  it('accepts zero as a valid amount', () => {
    expect(parseAmountToCents('0')).toBe(0);
  });

  it('rounds float error introduced by the multiplication', () => {
    expect(parseAmountToCents('19,99')).toBe(1999);
  });

  it('returns null for a negative amount', () => {
    expect(parseAmountToCents('-12,50')).toBeNull();
  });

  it('returns null for input that is not a number', () => {
    expect(parseAmountToCents('xyz')).toBeNull();
  });

  it('returns null for whitespace-only input', () => {
    expect(parseAmountToCents('   ')).toBeNull();
  });

  it('returns null for an empty input', () => {
    expect(parseAmountToCents('')).toBeNull();
  });

  it('returns null for more than two decimal places', () => {
    expect(parseAmountToCents('12,999')).toBeNull();
  });
});

describe('formatCentsAsEuro', () => {
  it('formats cents as a euro amount', () => {
    expect(formatCentsAsEuro(1250)).toBe('12,50\u00A0€');
  });

  it('keeps the minus sign for negative amounts', () => {
    expect(formatCentsAsEuro(-1250)).toBe('-12,50\u00A0€');
  });
});
