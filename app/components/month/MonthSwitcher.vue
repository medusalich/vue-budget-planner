<template>
  <div class="d-flex align-center">
    <v-btn
      icon="mdi-chevron-left"
      variant="text"
      aria-label="Vorheriger Monat"
      density="comfortable"
      @click="month = getPreviousMonth(month)" />

    <v-menu @update:model-value="showDisplayedYearOnOpen">
      <template #activator="{ props: menuActivatorProps }">
        <v-btn
          :id="monthNameId"
          v-bind="menuActivatorProps"
          variant="text"
          min-width="8.75em"
          class="text-none text-subtitle-1 text-sm-h6 px-2">
          <span aria-live="polite">{{ formatIsoMonthAsGermanMonth(month) }}</span>
        </v-btn>
      </template>
      <v-sheet>
        <div class="d-flex align-center justify-space-between px-2 pt-2">
          <v-btn
            icon="mdi-chevron-left"
            variant="text"
            density="comfortable"
            aria-label="Vorheriges Jahr"
            @click.stop="pickerYear--" />
          <span aria-live="polite">{{ pickerYear }}</span>
          <v-btn
            icon="mdi-chevron-right"
            variant="text"
            density="comfortable"
            aria-label="Nächstes Jahr"
            @click.stop="pickerYear++" />
        </div>
        <v-date-picker-months
          :model-value="displayedPickerMonth.monthIndex"
          :year="pickerYear"
          :allowed-months="isPickerMonthSelectable"
          @update:model-value="showPickerMonth" />
      </v-sheet>
    </v-menu>

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
  const displayedPickerMonth = computed(() => convertIsoMonthToPickerMonth(month.value));
  const pickerYear = ref(displayedPickerMonth.value.year);

  function showDisplayedYearOnOpen(isOpen: boolean) {
    if (isOpen) {
      pickerYear.value = displayedPickerMonth.value.year;
    }
  }

  function isPickerMonthSelectable(monthIndex: number) {
    return convertPickerMonthToIsoMonth(pickerYear.value, monthIndex) <= currentMonth;
  }

  const monthNameId = useId();

  function focusMonthName() {
    document.getElementById(monthNameId)?.focus();
  }

  function showNextMonth() {
    const nextMonth = getNextMonth(month.value);
    month.value = nextMonth;

    if (nextMonth >= currentMonth) {
      focusMonthName();
    }
  }

  function showCurrentMonth() {
    month.value = currentMonth;
    focusMonthName();
  }

  function showPickerMonth(monthIndex: number) {
    month.value = convertPickerMonthToIsoMonth(pickerYear.value, monthIndex);
    focusMonthName();
  }
</script>
