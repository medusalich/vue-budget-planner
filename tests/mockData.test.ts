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

  it('every account with an owner references an existing profile', () => {
    const profileIds = mockProfiles.map((profile) => profile.id);

    const accountsWithUnknownOwner = mockAccounts.filter(
      (account) => account.owner_id !== null && !profileIds.includes(account.owner_id),
    );

    expect(accountsWithUnknownOwner).toEqual([]);
  });

  it('every transaction has a valid booked_on date', () => {
    const transactionsWithInvalidBookedOn = mockTransactions.filter((transaction) =>
      Number.isNaN(Date.parse(transaction.booked_on)),
    );
    expect(transactionsWithInvalidBookedOn).toEqual([]);
  });

  it('every transaction has a valid created_at date', () => {
    const transactionsWithInvalidCreatedAt = mockTransactions.filter((transaction) =>
      Number.isNaN(Date.parse(transaction.created_at)),
    );
    expect(transactionsWithInvalidCreatedAt).toEqual([]);
  });

  it('every transaction was created on or after its booked_on date', () => {
    const transactionsCreatedBeforeBooking = mockTransactions.filter(
      (transaction) => transaction.created_at.slice(0, 10) < transaction.booked_on,
    );
    expect(transactionsCreatedBeforeBooking).toEqual([]);
  });
});
