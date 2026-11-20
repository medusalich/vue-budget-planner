<template>
  <dl class="d-flex flex-column flex-sm-row ga-3 my-4">
    <v-sheet
      v-for="labeledTotal in labeledTotals"
      :key="labeledTotal.label"
      class="flex-1-1-0 pa-4 d-flex flex-sm-column justify-space-between align-center align-sm-start border">
      <dt class="text-body-2 text-medium-emphasis">{{ labeledTotal.label }}</dt>
      <dd class="text-h6" :class="{ 'text-error': labeledTotal.isDeficit }">
        {{ labeledTotal.amount }}
      </dd>
    </v-sheet>
  </dl>
</template>

<script setup lang="ts">
  import type { MonthTotals } from '~/types';

  const props = defineProps<{ totals: MonthTotals }>();

  const labeledTotals = computed(() => [
    {
      label: 'Einnahmen',
      amount: formatCentsAsEuro(props.totals.incomeCents),
      isDeficit: false,
    },
    {
      label: 'Ausgaben',
      amount: formatCentsAsSignedEuro(props.totals.expenseCents, 'expense'),
      isDeficit: false,
    },
    {
      label: 'Saldo',
      amount: formatCentsAsEuro(props.totals.balanceCents),
      isDeficit: props.totals.balanceCents < 0,
    },
  ]);
</script>
