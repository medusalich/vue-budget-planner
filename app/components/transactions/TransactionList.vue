<template>
  <h2>Buchungen</h2>
  <div v-if="isLoading" role="status" class="text-center py-12">
    <v-progress-circular indeterminate aria-hidden="true" />
    <p class="mt-3">Buchungen werden geladen</p>
  </div>
  <v-empty-state
    v-else-if="transactions.length === 0"
    title="Leer wie ein Portemonnaie am letzten Tag des Monats."
    text="Noch nichts erfasst. Trag die erste Buchung ein,
    dann füllt sich wenigstens die Liste." />
  <v-sheet v-else max-width="800" class="border-sm">
    <v-row class="d-none d-md-flex border-b-sm ma-0" aria-hidden="true">
      <v-col md="2">Datum</v-col>
      <v-col md="4">Kategorie</v-col>
      <v-col md="">Notiz</v-col>
      <v-col md="3" class="text-right">Betrag</v-col>
    </v-row>
    <ul>
      <TransactionRow
        v-for="(transaction, index) in transactions"
        :key="transaction.id"
        :class="{ 'border-b-sm': index < transactions.length - 1 }"
        :transaction="transaction"
        @select="emit('select', $event)" />
    </ul>
  </v-sheet>
</template>

<script setup lang="ts">
  const emit = defineEmits<{ select: [transactionId: string] }>();

  const { transactions, loadTransactions, isLoading } = useTransactions();
  const { loadCategories } = useCategories();

  onMounted(loadTransactions);
  onMounted(loadCategories);
</script>
