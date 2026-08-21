import type { Transaction } from '~/types';
import { mockTransactions } from '~/data/mockTransactions';

const transactions = ref<Transaction[]>([]);

export function useTransactions() {
  async function loadTransactions() {
    transactions.value = [...mockTransactions];
  }
  return { transactions, loadTransactions };
}
