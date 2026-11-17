<template>
  <div class="d-flex align-center ga-2">
    <v-btn
      icon="mdi-chevron-left"
      variant="text"
      aria-label="Vorheriger Monat"
      @click="month = getPreviousMonth(month)" />
    <span class="text-h6" aria-live="polite">{{ formatIsoMonthAsGermanMonth(month) }}</span>
    <v-btn
      icon="mdi-chevron-right"
      variant="text"
      aria-label="Nächster Monat"
      @click="month = getNextMonth(month)" />
  </div>
</template>

<script setup lang="ts">
  const month = defineModel<string>({ required: true });
</script>
