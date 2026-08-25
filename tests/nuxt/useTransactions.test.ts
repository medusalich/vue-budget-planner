import { describe, it, expect, beforeEach } from 'vitest';
import { useTransactions } from '../../app/composables/useTransactions';
import { mockTransactions } from '../../app/data/mockTransactions';

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

      const bookingDatesInListOrder = transactions.value.map((transaction) => transaction.booked_on);
      const bookingDatesNewestFirst = [...bookingDatesInListOrder].sort().reverse();

      expect(bookingDatesInListOrder).toEqual(bookingDatesNewestFirst);
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
});
