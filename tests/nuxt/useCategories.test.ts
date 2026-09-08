import { describe, it, expect, beforeEach } from 'vitest';
import { useCategories } from '~/composables/useCategories';
import { defaultCategories } from '~/data/defaultCategories';
import type { Category } from '~/types';

const archivedCategory: Category = {
  id: 'old-subscriptions',
  name: 'Alte Abos',
  type: 'expense',
  icon: 'mdi-autorenew',
  color: '#b07800',
  is_archived: true,
};

const activeCategory: Category = {
  id: 'groceries',
  name: 'Lebensmittel',
  type: 'expense',
  icon: 'mdi-cart',
  color: '#2a78d6',
  is_archived: false,
};

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

    it('finds an archived category', () => {
      const { categories, findCategoryById } = useCategories();

      categories.value = [archivedCategory, activeCategory];

      const foundCategory = findCategoryById('old-subscriptions');
      expect(foundCategory?.id).toBe('old-subscriptions');
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

    it('does not offer an archived category', () => {
      const { categories, selectableCategoriesFor } = useCategories();

      categories.value = [archivedCategory, activeCategory];

      const selectableExpenseCategories = selectableCategoriesFor('expense');

      expect(selectableExpenseCategories).toHaveLength(1);
      expect(selectableExpenseCategories[0]?.id).toBe('groceries');
    });
  });
});
