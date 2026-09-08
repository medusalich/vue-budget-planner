import type { Category, CategoryType } from '~/types';
import { defaultCategories } from '~/data/defaultCategories';

const categories = ref<Category[]>([]);
const isLoading = ref(false);
const simulatedRequestMs = 150;
const error = ref<Error | null>(null);

export function useCategories() {
  async function loadCategories() {
    error.value = null;
    isLoading.value = true;

    try {
      await new Promise((resolve) => setTimeout(resolve, simulatedRequestMs));

      categories.value = [...defaultCategories];
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

  function findCategoryById(categoryId: string) {
    return categories.value.find((category) => category.id === categoryId);
  }

  function selectableCategoriesFor(categoryType: CategoryType) {
    return categories.value.filter(
      (category) => category.type === categoryType && !category.is_archived,
    );
  }

  return { categories, loadCategories, findCategoryById, selectableCategoriesFor, isLoading, error };
}
