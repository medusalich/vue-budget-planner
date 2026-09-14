<template>
  <li class="d-flex ga-4">
    <span>{{ formatIsoDateAsGermanDate(transaction.booked_on) }}</span>
    <span><v-icon :icon="category?.icon" /> {{ category?.name }}</span>
    <span v-if="transaction.note">{{ transaction.note }}</span>
    <v-icon v-else class="opacity-30">mdi-minus</v-icon>
    <span>{{ formattedAmount }}</span>
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
