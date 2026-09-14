<template>
  <v-row tag="li">
    <v-col md="2">{{ formatIsoDateAsGermanDate(transaction.booked_on) }}</v-col>
    <v-col md="4"><v-icon :icon="category?.icon" /> {{ category?.name }}</v-col>
    <v-col>
      <span v-if="transaction.note">{{ transaction.note }}</span>
      <v-icon v-else class="opacity-30">mdi-minus</v-icon>
    </v-col>
    <v-col md="3">{{ formattedAmount }}</v-col>
  </v-row>
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
