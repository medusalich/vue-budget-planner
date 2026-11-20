<template>
  <div class="d-flex align-center">
    <v-btn
      icon="mdi-chevron-left"
      variant="text"
      aria-label="Vorheriger Monat"
      density="comfortable"
      @click="month = getPreviousMonth(month)" />
    <v-btn
      ref="monthName"
      variant="text"
      min-width="8.75em"
      class="text-none text-subtitle-1 text-sm-h6 px-2">
      <span aria-live="polite">{{ formatIsoMonthAsGermanMonth(month) }}</span>
    </v-btn>
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
  import type { ComponentPublicInstance } from 'vue';

  const { smAndUp } = useDisplay();

  const month = defineModel<string>({ required: true });

  const currentMonth = formatDateAsIsoDate(new Date()).slice(0, 7);
  const isAtCurrentMonth = computed(() => month.value >= currentMonth);

  const monthName = useTemplateRef<ComponentPublicInstance>('monthName');

  function showNextMonth() {
    const nextMonth = getNextMonth(month.value);
    month.value = nextMonth;

    if (nextMonth >= currentMonth) {
      // Moves focus off the next arrow before it gets disabled.
      monthName.value?.$el.focus();
    }
  }

  function showCurrentMonth() {
    month.value = currentMonth;
    // Moves focus off the button before it gets disabled.
    monthName.value?.$el.focus();
  }
</script>
