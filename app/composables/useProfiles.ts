import type { Profile } from '~/types';
import { mockProfiles } from '~/data/mockProfiles';

const profiles = ref<Profile[]>([]);

export function useProfiles() {
  async function loadProfiles() {
    profiles.value = [...mockProfiles];
  }

  return { profiles, loadProfiles };
}
