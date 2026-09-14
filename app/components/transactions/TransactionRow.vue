<template>
  <li>
    {{ formatIsoDateAsGermanDate(transaction.booked_on) }} | <v-icon :icon="category?.icon" />
    {{ category?.name }} | {{ transaction.note }} | {{ formattedAmount }}
  </li>
</template>

<script setup lang="ts">
  import type { Transaction } from '~/types';

  const props = defineProps<{ transaction: Transaction }>();
  const { findCategoryById } = useCategories();

  const category = computed(() => findCategoryById(props.transaction.category_id));
  const formattedAmount = computed(() =>
    category.value
      ? formatCentsAsSignedEuro(props.transaction.amount_cents, category.value.type)
      : formatCentsAsEuro(props.transaction.amount_cents),
  );
</script>
