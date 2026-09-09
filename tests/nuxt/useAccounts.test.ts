import { describe, it, expect, beforeEach } from 'vitest';
import { useAccounts } from '~/composables/useAccounts';
import { mockAccounts } from '~/data/mockAccounts';

describe('useAccounts', () => {
  beforeEach(async () => {
    const { loadAccounts } = useAccounts();
    await loadAccounts();
  });

  describe('loadAccounts', () => {
    it('loads all accounts from the mock data', () => {
      const { accounts } = useAccounts();

      expect(accounts.value).toHaveLength(mockAccounts.length);
    });

    it('switches isLoading on while the accounts are on their way and off when they have arrived', async () => {
      const { isLoading, loadAccounts } = useAccounts();

      const loadInProgress = loadAccounts();
      expect(isLoading.value).toBe(true);

      await loadInProgress;
      expect(isLoading.value).toBe(false);
    });
  });

  describe('findAccountById', () => {
    it('finds an account by its id', () => {
      const { findAccountById } = useAccounts();

      const foundAccount = findAccountById('joint-account');
      expect(foundAccount?.id).toBe('joint-account');
    });
  });
});
