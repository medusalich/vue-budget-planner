<template>
  <li class="d-block">
    <button class="w-100 text-left" @click="emit('select', transaction.id)">
      <v-row tag="span" class="ma-0">
        <v-col tag="span" cols="6" md="2" class="pb-1 pb-md-3">
          {{ formatIsoDateAsGermanDate(transaction.booked_on) }}
        </v-col>
        <v-col tag="span" cols="6" md="4" class="text-right text-md-left pb-1 pb-md-3">
          <v-icon :icon="category?.icon" /> {{ category?.name }}
        </v-col>
        <v-col tag="span" cols="6" md="" class="pt-1 pt-md-3">
          <span v-if="transaction.note">{{ transaction.note }}</span>
          <v-icon v-else class="opacity-30">mdi-minus</v-icon>
        </v-col>
        <v-col tag="span" cols="6" md="3" class="text-right pt-1 pt-md-3">{{ formattedAmount }}</v-col>
      </v-row>
    </button>
  </li>
</template>

<script setup lang="ts">
  import type { Transaction } from '~/types';

  const props = defineProps<{ transaction: Transaction }>();
  const emit = defineEmits<{ select: [transactionId: string] }>();

  const { findCategoryById } = useCategories();

  const category = computed(() => findCategoryById(props.transaction.category_id));
  const formattedAmount = computed(() =>
    category.value
      ? formatCentsAsSignedEuro(props.transaction.amount_cents, category.value.type)
      : formatCentsAsEuro(props.transaction.amount_cents),
  );
</script>

<style scoped>
  button:hover {
    background-color: rgb(var(--v-theme-on-surface), var(--v-hover-opacity));
  }

  button:focus-visible {
    background-color: rgb(var(--v-theme-on-surface), var(--v-focus-opacity));
    outline: 2px solid rgb(var(--v-theme-on-surface), var(--v-focus-opacity));
    outline-offset: -1px;
  }
</style>
