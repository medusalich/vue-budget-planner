import { describe, it, expect } from 'vitest';
import { parseAmount } from '../app/composables/useMoney';

describe('parseAmount', () => {
  it('parses a comma as decimal separator', () => {
    expect(parseAmount('12,50')).toBe(1250);
  });
});
