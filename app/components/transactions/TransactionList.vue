<template>
  <h2>Buchungen</h2>
  <p v-if="isLoading">Buchungen werden geladen</p>
  <ul v-else>
    <TransactionRow
      v-for="transaction in transactions"
      :key="transaction.id"
      :transaction="transaction" />
  </ul>
</template>

<script setup lang="ts">
  const { transactions, loadTransactions, isLoading } = useTransactions();
  const { loadCategories } = useCategories();

  onMounted(loadTransactions);
  onMounted(loadCategories);
</script>
