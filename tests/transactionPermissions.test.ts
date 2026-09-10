import { describe, it, expect } from 'vitest';
import { mayBeEditedBy } from '../app/utils/transactionPermissions';
import type { Transaction } from '../app/types';

const transactionCreatedByUser1: Transaction = {
  id: 'tx-901',
  amount_cents: 1250,
  booked_on: '2026-09-10',
  category_id: 'groceries',
  account_id: 'user-1-account',
  note: null,
  created_by: 'user-1',
  created_at: '2026-09-10T08:00:00Z',
};

describe('mayBeEditedBy', () => {
  it('lets the member who created the transaction edit it', () => {
    expect(mayBeEditedBy(transactionCreatedByUser1, 'user-1')).toBe(true);
  });

  it('denies editing to a member who did not create the transaction', () => {
    expect(mayBeEditedBy(transactionCreatedByUser1, 'user-2')).toBe(false);
  });
});
