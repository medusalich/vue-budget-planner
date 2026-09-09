import type { Account } from '~/types';
import { mockAccounts } from '~/data/mockAccounts';

const accounts = ref<Account[]>([]);
const isLoading = ref(false);
const simulatedRequestMs = 150;

export function useAccounts() {
  async function loadAccounts() {
    isLoading.value = true;
    await new Promise((resolve) => setTimeout(resolve, simulatedRequestMs));
    accounts.value = [...mockAccounts];
    isLoading.value = false;
  }

  function findAccountById(accountId: string) {
    return accounts.value.find((account) => account.id === accountId);
  }

  return { accounts, loadAccounts, isLoading, findAccountById };
}
