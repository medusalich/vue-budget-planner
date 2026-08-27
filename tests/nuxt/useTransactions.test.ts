import { describe, it, expect, beforeEach } from 'vitest';
import { useTransactions } from '~/composables/useTransactions';
import { mockTransactions } from '~/data/mockTransactions';
import type { Transaction } from '~/types';

function expectNewestBookingFirst(transactions: Transaction[]) {
  const bookingDatesInListOrder = transactions.map((transaction) => transaction.booked_on);
  const bookingDatesNewestFirst = [...bookingDatesInListOrder].sort().reverse();

  expect(bookingDatesInListOrder).toEqual(bookingDatesNewestFirst);
}

describe('useTransactions', () => {
  beforeEach(async () => {
    const { loadTransactions } = useTransactions();
    await loadTransactions();
  });

  describe('loadTransactions', () => {
    it('loads all transactions from the mock data', () => {
      const { transactions } = useTransactions();

      expect(transactions.value).toHaveLength(mockTransactions.length);
    });

    it('sorts the transactions with the newest booking first', () => {
      const { transactions } = useTransactions();

      expectNewestBookingFirst(transactions.value);
    });

    it('switches isLoading on while the transactions are on their way and off when they have arrived', async () => {
      const { isLoading, loadTransactions } = useTransactions();

      const loadInProgress = loadTransactions();
      expect(isLoading.value).toBe(true);

      await loadInProgress;
      expect(isLoading.value).toBe(false);
    });

    it('clears a previous error when the transactions load again', async () => {
      const { error, removeTransaction, loadTransactions } = useTransactions();

      await removeTransaction('tx921');
      expect(error.value).toBeInstanceOf(Error);

      await loadTransactions();
      expect(error.value).toBeNull();
    });
  });

  describe('removeTransaction', () => {
    it('removes the given transaction from the list', async () => {
      const { transactions, removeTransaction } = useTransactions();

      await removeTransaction('tx-001');
      expect(transactions.value).toHaveLength(mockTransactions.length - 1);

      const idsStillInTransaction = transactions.value.map((transaction) => transaction.id);
      expect(idsStillInTransaction).not.toContain('tx-001');
    });

    it('sets an error when the transaction id does not exist', async () => {
      const { error, removeTransaction } = useTransactions();

      await removeTransaction('tx-921');
      expect(error.value).toBeInstanceOf(Error);
    });

    it('clears a previous error when the next removal succeeds', async () => {
      const { error, removeTransaction } = useTransactions();

      await removeTransaction('tx-921');
      expect(error.value).toBeInstanceOf(Error);

      await removeTransaction('tx-001');
      expect(error.value).toBeNull();
    });
  });

  describe('addTransaction', () => {
    it('adds a transaction to the list', async () => {
      const { transactions, addTransaction } = useTransactions();

      await addTransaction({
        amount_cents: 12345,
        booked_on: '2026-09-21',
        category_id: 'mobility',
        account_id: 'user-1-account',
        note: null,
      });
      expect(transactions.value).toHaveLength(mockTransactions.length + 1);
    });

    it('keeps the list sorted with the newest booking first', async () => {
      const { transactions, addTransaction } = useTransactions();

      await addTransaction({
        amount_cents: 12345,
        booked_on: '2026-09-21',
        category_id: 'mobility',
        account_id: 'user-1-account',
        note: null,
      });
      expectNewestBookingFirst(transactions.value);
    });

    it('completes the new transaction with an id, an author and a creation timestamp', async () => {
      const { transactions, addTransaction } = useTransactions();

      await addTransaction({
        amount_cents: 12345,
        booked_on: '2026-09-21',
        category_id: 'mobility',
        account_id: 'user-1-account',
        note: null,
      });
      const addedTransaction = transactions.value.find(
        (transaction) => transaction.amount_cents === 12345,
      );
      expect(addedTransaction?.created_by).toBe('user-1');

      expect(addedTransaction?.id).toEqual(expect.any(String));

      const parsedCreationTimestamp = Date.parse(addedTransaction?.created_at ?? '');
      expect(parsedCreationTimestamp).not.toBeNaN();
    });

    it('clears a previous error when a transaction is added', async () => {
      const { error, removeTransaction, addTransaction } = useTransactions();

      await removeTransaction('tx-921');
      expect(error.value).toBeInstanceOf(Error);

      await addTransaction({
        amount_cents: 12345,
        booked_on: '2026-09-21',
        category_id: 'mobility',
        account_id: 'user-1-account',
        note: null,
      });
      expect(error.value).toBeNull();
    });
  });

  describe('updateTransaction', () => {
    it('applies the given change to the transaction', async () => {
      const { transactions, updateTransaction } = useTransactions();

      await updateTransaction('tx-001', { amount_cents: 50000 });

      const updatedTransaction = transactions.value.find((transaction) => transaction.id === 'tx-001');
      expect(updatedTransaction?.amount_cents).toBe(50000);
    });

    it('keeps the list sorted when the booking date changes', async () => {
      const { transactions, updateTransaction } = useTransactions();

      await updateTransaction('tx-001', { booked_on: '2026-09-30' });

      const updatedTransaction = transactions.value.find((transaction) => transaction.id === 'tx-001');
      expect(updatedTransaction?.booked_on).toBe('2026-09-30');

      expectNewestBookingFirst(transactions.value);
    });

    it('sets an error when the transaction id does not exist', async () => {
      const { error, updateTransaction } = useTransactions();

      await updateTransaction('tx-921', { booked_on: '2026-09-30' });
      expect(error.value).toBeInstanceOf(Error);
    });
  });
});
