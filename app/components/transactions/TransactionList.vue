<template>
  <h2>Buchungen</h2>
  <p v-if="isLoading">Buchungen werden geladen</p>
  <ul v-else>
    <li v-for="transaction in transactions" :key="transaction.id">
      {{ formatIsoDateAsGermanDate(transaction.booked_on) }} |
      {{ formatCentsAsEuro(transaction.amount_cents) }} |
      {{ findCategoryById(transaction.category_id)?.name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
  const { transactions, loadTransactions, isLoading } = useTransactions();
  const { loadCategories, findCategoryById } = useCategories();

  onMounted(loadTransactions);
  onMounted(loadCategories);
</script>
