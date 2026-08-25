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
  });
});
