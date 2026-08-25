import type { Transaction } from '~/types';
import { mockTransactions } from '~/data/mockTransactions';

const transactions = ref<Transaction[]>([]);
const isLoading = ref(false);
const simulatedRequestMs = 150;
const error = ref<Error | null>(null);

export function useTransactions() {
  async function loadTransactions() {
    isLoading.value = true;
    await new Promise((resolve) => setTimeout(resolve, simulatedRequestMs));
    const newestBookedFirst = (a: Transaction, b: Transaction) => b.booked_on.localeCompare(a.booked_on);
    transactions.value = [...mockTransactions].sort(newestBookedFirst);
    isLoading.value = false;
  }

  async function removeTransaction(transactionId: string) {
    const transactionExists = transactions.value.some((transaction) => transaction.id === transactionId);

    if (!transactionExists) {
      error.value = new Error(`Transaction ${transactionId} not found`);
      return;
    }

    transactions.value = transactions.value.filter((transaction) => transaction.id !== transactionId);
  }

  return { transactions, loadTransactions, isLoading, removeTransaction, error };
}
