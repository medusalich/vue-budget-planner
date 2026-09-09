import type { Account } from '~/types';
import { mockAccounts } from '~/data/mockAccounts';

const accounts = ref<Account[]>([]);
const isLoading = ref(false);
const simulatedRequestMs = 150;
const error = ref<Error | null>(null);

export function useAccounts() {
  async function loadAccounts() {
    error.value = null;
    isLoading.value = true;

    try {
      await new Promise((resolve) => setTimeout(resolve, simulatedRequestMs));

      accounts.value = [...mockAccounts];
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

  function findAccountById(accountId: string) {
    return accounts.value.find((account) => account.id === accountId);
  }

  const selectableAccounts = computed(() => accounts.value.filter((account) => !account.is_archived));

  return { accounts, loadAccounts, isLoading, findAccountById, selectableAccounts, error };
}
