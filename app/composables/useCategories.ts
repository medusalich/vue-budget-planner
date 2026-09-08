import type { Category } from '~/types';
import { defaultCategories } from '~/data/defaultCategories';

const categories = ref<Category[]>([]);

export function useCategories() {
  async function loadCategories() {
    categories.value = [...defaultCategories];
  }

  return { categories, loadCategories };
}
