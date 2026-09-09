import type { Profile } from '~/types';
import { mockProfiles } from '~/data/mockProfiles';

const profiles = ref<Profile[]>([]);
const isLoading = ref(false);
const simulatedRequestMs = 150;
const error = ref<Error | null>(null);

export function useProfiles() {
  async function loadProfiles() {
    error.value = null;
    isLoading.value = true;

    try {
      await new Promise((resolve) => setTimeout(resolve, simulatedRequestMs));

      profiles.value = [...mockProfiles];
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

  function findProfileById(profileId: string) {
    return profiles.value.find((profile) => profile.id === profileId);
  }

  return { profiles, loadProfiles, isLoading, findProfileById, error };
}
