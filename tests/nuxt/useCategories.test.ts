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
});
