<template>
  <h2>Buchungen</h2>
  <p v-if="isLoading">Buchungen werden geladen</p>
  <v-empty-state
    v-else-if="transactions.length === 0"
    title="Leer wie ein Portemonnaie am letzten Tag des Monats."
    text="Noch nichts erfasst. Trag die erste Buchung ein,
    dann füllt sich wenigstens die Liste.">
  </v-empty-state>
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
