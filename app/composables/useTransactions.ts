import type { Transaction, NewTransaction } from '~/types';
import { mockTransactions } from '~/data/mockTransactions';

const transactions = ref<Transaction[]>([]);
const isLoading = ref(false);
const error = ref<Error | null>(null);
const simulatedRequestMs = 150;
const demoSignedInUserId = 'user-1';
const newestBookedFirst = (a: Transaction, b: Transaction) => b.booked_on.localeCompare(a.booked_on);

export function useTransactions() {
  async function loadTransactions() {
    error.value = null;
    isLoading.value = true;

    try {
      await new Promise((resolve) => setTimeout(resolve, simulatedRequestMs));

      transactions.value = [...mockTransactions].sort(newestBookedFirst);
    } catch (caughtError) {
      if (caughtError instanceof Error) {
        error.value = caughtError;
      } else {
        error.value = new Error(String(caughtError));
      }
    } finally {
      isLoading.value = false;
    }
  }

  async function removeTransaction(transactionId: string) {
    error.value = null;

    const transactionExists = transactions.value.some((transaction) => transaction.id === transactionId);

    if (!transactionExists) {
      error.value = new Error(`Transaction ${transactionId} not found`);
      return;
    }

    transactions.value = transactions.value.filter((transaction) => transaction.id !== transactionId);
  }

  async function addTransaction(newTransaction: NewTransaction) {
    error.value = null;

    const addedTransaction: Transaction = {
      ...newTransaction,
      id: crypto.randomUUID(),
      created_by: demoSignedInUserId,
      created_at: new Date().toISOString(),
    };

    transactions.value = [...transactions.value, addedTransaction].sort(newestBookedFirst);
  }

  async function updateTransaction(transactionId: string, changes: Partial<NewTransaction>) {
    const transactionExists = transactions.value.some((transaction) => transaction.id === transactionId);

    if (!transactionExists) {
      error.value = new Error(`Transaction ${transactionId} not found`);
      return;
    }

    transactions.value = transactions.value
      .map((transaction) => {
        if (transaction.id !== transactionId) return transaction;

        return { ...transaction, ...changes };
      })
      .sort(newestBookedFirst);
  }

  return {
    transactions,
    loadTransactions,
    isLoading,
    removeTransaction,
    error,
    addTransaction,
    updateTransaction,
  };
}
