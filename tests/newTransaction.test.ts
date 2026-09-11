import { describe, it, expect } from 'vitest';
import { buildNewTransaction } from '../app/utils/newTransaction';
import type { EnteredTransactionFields } from '../app/utils/newTransaction';

const enteredGroceryPurchase: EnteredTransactionFields = {
  amountCents: 2350,
  bookedOn: '2026-09-11',
  categoryId: 'grocery',
  accountId: 'user-1',
  note: 'Wocheneinkauf',
};

describe('buildNewTransaction', () => {
  it('carries every entered value into its transaction field', () => {
    expect(buildNewTransaction(enteredGroceryPurchase)).toEqual({
      amount_cents: 2350,
      booked_on: '2026-09-11',
      category_id: 'grocery',
      account_id: 'user-1',
      note: 'Wocheneinkauf',
    });
  });

  it('turns an empty note into null', () => {
    const withEmptyNote = { ...enteredGroceryPurchase, note: '' };
    expect(buildNewTransaction(withEmptyNote).note).toBe(null);
  });
});
