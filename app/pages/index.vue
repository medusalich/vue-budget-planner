<template>
  <v-container>
    <h1 class="text-h4 mb-4">Haushaltsbuch</h1>
    <v-btn
      id="new-transaction-button"
      color="primary"
      prepend-icon="mdi-plus"
      @click="startNewTransaction">
      Buchung erfassen
    </v-btn>
    <TransactionDialog
      v-model="isTransactionDialogOpen"
      :transaction-id="selectedTransactionId"
      @deleted="focusNewTransactionButton" />
    <TransactionList @select="showTransaction($event)" />
  </v-container>
</template>

<script setup lang="ts">
  const selectedTransactionId = ref<string | null>(null);
  const isTransactionDialogOpen = ref(false);

  function showTransaction(transactionId: string) {
    selectedTransactionId.value = transactionId;
    isTransactionDialogOpen.value = true;
  }

  function startNewTransaction() {
    selectedTransactionId.value = null;
    isTransactionDialogOpen.value = true;
  }

  function focusNewTransactionButton() {
    document.getElementById('new-transaction-button')?.focus();
  }
</script>
