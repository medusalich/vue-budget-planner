import { describe, it, expect } from 'vitest';
import { useTransactions } from '../app/composables/useTransactions';
import { mockTransactions } from '../app/data/mockTransactions';

describe('loadTransactions', () => {
  it('loads all transactions from the mock data', async () => {
    const { transactions, loadTransactions } = useTransactions();

    await loadTransactions();

    expect(transactions.value).toHaveLength(mockTransactions.length);
  });
});
