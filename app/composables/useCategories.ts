import type { Category, CategoryType } from '~/types';
import { defaultCategories } from '~/data/defaultCategories';

const categories = ref<Category[]>([]);
const isLoading = ref(false);
const simulatedRequestMs = 150;

export function useCategories() {
  async function loadCategories() {
    isLoading.value = true;
    await new Promise((resolve) => setTimeout(resolve, simulatedRequestMs));
    categories.value = [...defaultCategories];
    isLoading.value = false;
  }

  function findCategoryById(categoryId: string) {
    return categories.value.find((category) => category.id === categoryId);
  }

  function selectableCategoriesFor(categoryType: CategoryType) {
    return categories.value.filter(
      (category) => category.type === categoryType && !category.is_archived,
    );
  }

  return { categories, loadCategories, findCategoryById, selectableCategoriesFor, isLoading };
}
