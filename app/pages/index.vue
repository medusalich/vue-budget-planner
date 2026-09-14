<template>
  <v-container>
    <h1 class="text-h4 mb-4">Haushaltsbuch</h1>
    <v-btn color="primary" prepend-icon="mdi-plus" @click="isTransactionDialogOpen = true">
      Buchung erfassen
    </v-btn>
    <TransactionDialog v-model="isTransactionDialogOpen" />
    <TransactionList />
  </v-container>
</template>

<script setup lang="ts">
  const isTransactionDialogOpen = ref(false);
</script>
