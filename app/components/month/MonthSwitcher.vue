<template>
  <div class="d-flex align-center ga-2">
    <v-btn
      icon="mdi-chevron-left"
      variant="text"
      aria-label="Vorheriger Monat"
      @click="month = getPreviousMonth(month)" />
    <span ref="monthName" class="text-h6" tabindex="-1" aria-live="polite">
      {{ formatIsoMonthAsGermanMonth(month) }}
    </span>
    <v-btn
      icon="mdi-chevron-right"
      variant="text"
      aria-label="Nächster Monat"
      :disabled="isAtCurrentMonth"
      @click="showNextMonth" />
  </div>
</template>

<script setup lang="ts">
  const month = defineModel<string>({ required: true });

  const currentMonth = formatDateAsIsoDate(new Date()).slice(0, 7);
  const isAtCurrentMonth = computed(() => month.value >= currentMonth);

  const monthName = useTemplateRef<HTMLElement>('monthName');

  function showNextMonth() {
    const nextMonth = getNextMonth(month.value);
    month.value = nextMonth;

    if (nextMonth >= currentMonth) {
      // Moves focus off the next arrow before it gets disabled.
      monthName.value?.focus();
    }
  }
</script>
