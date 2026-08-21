import type { Transaction } from '~/types';
import { mockTransactions } from '~/data/mockTransactions';

const transactions = ref<Transaction[]>([]);
const isLoading = ref(false);
const simulatedRequestMs = 150;

export function useTransactions() {
  async function loadTransactions() {
    isLoading.value = true;
    await new Promise((resolve) => setTimeout(resolve, simulatedRequestMs));
    const newestBookedFirst = (a: Transaction, b: Transaction) => b.booked_on.localeCompare(a.booked_on);
    transactions.value = [...mockTransactions].sort(newestBookedFirst);
    isLoading.value = false;
  }
  return { transactions, loadTransactions, isLoading };
}
