import { describe, it, expect, beforeEach } from 'vitest';
import { useAccounts } from '~/composables/useAccounts';
import { mockAccounts } from '~/data/mockAccounts';
import type { Account } from '~/types';

const archivedAccount: Account = {
  id: 'old-savings',
  name: 'Altes Sparkonto',
  owner_id: 'user-1',
  is_archived: true,
};

const activeAccount: Account = {
  id: 'joint-account',
  name: 'Gemeinsames Konto',
  owner_id: null,
  is_archived: false,
};

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

    it('finds an archived account', () => {
      const { accounts, findAccountById } = useAccounts();

      accounts.value = [archivedAccount];

      const foundAccount = findAccountById('old-savings');
      expect(foundAccount?.id).toBe('old-savings');
    });
  });

  describe('selectableAccounts', () => {
    it('does not offer an archived account', () => {
      const { accounts, selectableAccounts } = useAccounts();

      accounts.value = [archivedAccount, activeAccount];

      const offeredAccounts = selectableAccounts.value;

      expect(offeredAccounts).toHaveLength(1);
      expect(offeredAccounts[0]?.id).toBe('joint-account');
    });
  });
});
