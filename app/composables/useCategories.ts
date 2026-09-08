import type { Category, CategoryType } from '~/types';
import { defaultCategories } from '~/data/defaultCategories';

const categories = ref<Category[]>([]);

export function useCategories() {
  async function loadCategories() {
    categories.value = [...defaultCategories];
  }

  function findCategoryById(categoryId: string) {
    return categories.value.find((category) => category.id === categoryId);
  }

  function selectableCategoriesFor(categoryType: CategoryType) {
    return categories.value.filter((category) => category.type === categoryType);
  }

  return { categories, loadCategories, findCategoryById, selectableCategoriesFor };
}
