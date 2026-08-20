import { describe, it, expect } from 'vitest';
import { mockTransactions } from '../app/data/mockTransactions';
import { mockAccounts } from '../app/data/mockAccounts';
import { defaultCategories } from '../app/data/defaultCategories';
import { mockProfiles } from '../app/data/mockProfiles';

describe('mock data', () => {
  it('every transaction references an existing account', () => {
    const accountIds = mockAccounts.map((account) => account.id);

    const transactionsWithUnknownAccount = mockTransactions.filter(
      (transaction) => !accountIds.includes(transaction.account_id),
    );

    expect(transactionsWithUnknownAccount).toEqual([]);
  });

  it('every transaction references an existing category', () => {
    const categoryIds = defaultCategories.map((category) => category.id);

    const transactionsWithUnknownCategory = mockTransactions.filter(
      (transaction) => !categoryIds.includes(transaction.category_id),
    );

    expect(transactionsWithUnknownCategory).toEqual([]);
  });

  it('every transaction was created by an existing profile', () => {
    const profileIds = mockProfiles.map((profile) => profile.id);

    const transactionsWithUnknownAuthor = mockTransactions.filter(
      (transaction) => !profileIds.includes(transaction.created_by),
    );

    expect(transactionsWithUnknownAuthor).toEqual([]);
  });
});
