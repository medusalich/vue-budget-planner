import { describe, it, expect, beforeEach } from 'vitest';
import { useProfiles } from '~/composables/useProfiles';
import { mockProfiles } from '~/data/mockProfiles';

describe('useProfiles', () => {
  beforeEach(async () => {
    const { loadProfiles } = useProfiles();
    await loadProfiles();
  });

  describe('loadProfiles', () => {
    it('loads all profiles from the mock data', () => {
      const { profiles } = useProfiles();

      expect(profiles.value).toHaveLength(mockProfiles.length);
    });

    it('switches isLoading on while the profiles are on their way and off when they have arrived', async () => {
      const { isLoading, loadProfiles } = useProfiles();

      const loadInProgress = loadProfiles();
      expect(isLoading.value).toBe(true);

      await loadInProgress;
      expect(isLoading.value).toBe(false);
    });
  });

  describe('findProfileById', () => {
    it('finds a profile by its id', () => {
      const { findProfileById } = useProfiles();

      const foundProfile = findProfileById('user-1');
      expect(foundProfile?.id).toBe('user-1');
    });
  });
});
