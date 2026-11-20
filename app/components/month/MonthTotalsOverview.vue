<template>
  <dl>
    <div>
      <dt>Einnahmen</dt>
      <dd>{{ formatCentsAsEuro(totals.incomeCents) }}</dd>
    </div>
    <div>
      <dt>Ausgaben</dt>
      <dd>{{ formatCentsAsSignedEuro(totals.expenseCents, 'expense') }}</dd>
    </div>
    <div>
      <dt>Saldo</dt>
      <dd>{{ formatCentsAsEuro(totals.balanceCents) }}</dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
  import type { MonthTotals } from '~/types';

  defineProps<{ totals: MonthTotals }>();
</script>
