import type { Account } from '~/types';
import { mockAccounts } from '~/data/mockAccounts';

const accounts = ref<Account[]>([]);

export function useAccounts() {
  async function loadAccounts() {
    accounts.value = [...mockAccounts];
  }

  return { accounts, loadAccounts };
}
