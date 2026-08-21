import { describe, it, expect } from 'vitest';
import { useTransactions } from '../../app/composables/useTransactions';
import { mockTransactions } from '../../app/data/mockTransactions';

describe('loadTransactions', () => {
  it('loads all transactions from the mock data', async () => {
    const { transactions, loadTransactions } = useTransactions();

    await loadTransactions();

    expect(transactions.value).toHaveLength(mockTransactions.length);
  });

  it('sorts the transactions with the newest booking first', async () => {
    const { transactions, loadTransactions } = useTransactions();

    await loadTransactions();

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
