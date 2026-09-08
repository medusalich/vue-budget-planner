import type { Category } from '~/types';
import { defaultCategories } from '~/data/defaultCategories';

const categories = ref<Category[]>([]);

export function useCategories() {
  async function loadCategories() {
    categories.value = [...defaultCategories];
  }

  function findCategoryById(categoryId: string) {
    return categories.value.find((category) => category.id === categoryId);
  }

  return { categories, loadCategories, findCategoryById };
}
