import { describe, it, expect, beforeEach } from 'vitest';
import { useCategories } from '~/composables/useCategories';
import { defaultCategories } from '~/data/defaultCategories';

describe('useCategories', () => {
  beforeEach(async () => {
    const { loadCategories } = useCategories();
    await loadCategories();
  });

  describe('loadCategories', () => {
    it('loads all categories from the default data', () => {
      const { categories } = useCategories();

      expect(categories.value).toHaveLength(defaultCategories.length);
    });
  });

  describe('findCategoryById', () => {
    it('finds a category by its id', () => {
      const { findCategoryById } = useCategories();

      const foundCategory = findCategoryById('groceries');
      expect(foundCategory?.id).toBe('groceries');
    });
  });

  describe('selectableCategoriesFor', () => {
    it('returns the income categories', () => {
      const { selectableCategoriesFor } = useCategories();

      const incomeCategories = selectableCategoriesFor('income');
      expect(incomeCategories).toHaveLength(3);

      const allAreIncomeCategories = incomeCategories.every((category) => category.type === 'income');
      expect(allAreIncomeCategories).toBe(true);
    });
  });
});
