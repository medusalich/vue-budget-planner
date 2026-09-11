<template>
  <h2>Buchungen</h2>
  <ul>
    <li v-for="transaction in transactions" :key="transaction.id">
      {{ transaction.booked_on }} |
      {{ formatCentsAsEuro(transaction.amount_cents) }}
    </li>
  </ul>
</template>

<script setup lang="ts">
  const { transactions, loadTransactions } = useTransactions();

  onMounted(loadTransactions);
</script>
