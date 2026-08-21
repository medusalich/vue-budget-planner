import type { Transaction } from '~/types';
import { mockTransactions } from '~/data/mockTransactions';

const transactions = ref<Transaction[]>([]);

export function useTransactions() {
  async function loadTransactions() {
    const newestBookedFirst = (a: Transaction, b: Transaction) => b.booked_on.localeCompare(a.booked_on);
    transactions.value = [...mockTransactions].sort(newestBookedFirst);
  }
  return { transactions, loadTransactions };
}
