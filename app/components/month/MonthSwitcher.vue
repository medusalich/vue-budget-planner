<template>
  <div class="d-flex align-center ga-2">
    <v-btn
      icon="mdi-chevron-left"
      variant="text"
      aria-label="Vorheriger Monat"
      density="comfortable"
      @click="month = getPreviousMonth(month)" />
    <span ref="monthName" class="text-sm-h6 text-no-wrap" tabindex="-1" aria-live="polite">
      {{ formatIsoMonthAsGermanMonth(month) }}
    </span>
    <v-btn
      icon="mdi-chevron-right"
      variant="text"
      aria-label="Nächster Monat"
      density="comfortable"
      :disabled="isAtCurrentMonth"
      @click="showNextMonth" />
    <v-btn
      variant="outlined"
      :size="smAndUp ? 'default' : 'small'"
      :disabled="isAtCurrentMonth"
      @click="showCurrentMonth">
      Heute
    </v-btn>
  </div>
</template>

<script setup lang="ts">
  const { smAndUp } = useDisplay();

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

  function showCurrentMonth() {
    month.value = currentMonth;
    // Moves focus off the button before it gets disabled.
    monthName.value?.focus();
  }
</script>
