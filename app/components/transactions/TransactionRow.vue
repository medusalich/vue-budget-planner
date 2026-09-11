<template>
  <li>
    {{ formatIsoDateAsGermanDate(transaction.booked_on) }} |
    {{ formatCentsAsEuro(transaction.amount_cents) }} |
    {{ category?.name }}
  </li>
</template>

<script setup lang="ts">
  import type { Transaction } from '~/types';

  const props = defineProps<{ transaction: Transaction }>();
  const { findCategoryById } = useCategories();

  const category = computed(() => findCategoryById(props.transaction.category_id));
</script>
