import { describe, it, expect } from 'vitest';
import { parseAmount } from '../app/composables/useMoney';

describe('parseAmount', () => {
  it('parses a comma as decimal separator', () => {
    expect(parseAmount('12,50')).toBe(1250);
  });

  it('parses a dot as decimal separator', () => {
    expect(parseAmount('12.50')).toBe(1250);
  });

  it('accepts zero as a valid length', () => {
    expect(parseAmount('0')).toBe(0);
  });

  it('rounds float error introduced by the multiplication', () => {
    expect(parseAmount('19,99')).toBe(1999);
  });

  it('returns null for a negative amount', () => {
    expect(parseAmount('-12,50')).toBeNull();
  });

  it('returns null for input that is not a number', () => {
    expect(parseAmount('xyz')).toBeNull();
  });

  it('returns null for whitespace-only input', () => {
    expect(parseAmount('   ')).toBeNull();
  });

  it('returns null for an empty input', () => {
    expect(parseAmount('')).toBeNull();
  });
});
