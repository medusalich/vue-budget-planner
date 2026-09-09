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
  });
});
