import { describe, it, expect } from 'vitest';
import { mockTransactions } from '../app/data/mockTransactions';
import { mockAccounts } from '../app/data/mockAccounts';

describe('mock data', () => {
  it('every transaction references an existing account', () => {
    const accountIds = mockAccounts.map((account) => account.id);

    const transactionsWithUnknownAccount = mockTransactions.filter(
      (transaction) => !accountIds.includes(transaction.account_id),
    );

    expect(transactionsWithUnknownAccount).toEqual([]);
  });
});
