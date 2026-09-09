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
  });
});
