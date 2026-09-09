import type { Profile } from '~/types';
import { mockProfiles } from '~/data/mockProfiles';

const profiles = ref<Profile[]>([]);
const isLoading = ref(false);
const simulatedRequestMs = 150;

export function useProfiles() {
  async function loadProfiles() {
    isLoading.value = true;
    await new Promise((resolve) => setTimeout(resolve, simulatedRequestMs));
    profiles.value = [...mockProfiles];
    isLoading.value = false;
  }

  return { profiles, loadProfiles, isLoading };
}
