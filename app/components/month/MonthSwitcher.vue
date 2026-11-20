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
          <span :id="pickerYearId" tabindex="-1" aria-live="polite">{{ pickerYear }}</span>
          <v-btn
            icon="mdi-chevron-right"
            variant="text"
            density="comfortable"
            aria-label="Nächstes Jahr"
            :disabled="pickerYear >= currentYear"
            @click.stop="showNextPickerYear" />
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

  const currentMonth = getIsoMonthOfIsoDate(formatDateAsIsoDate(new Date()));
  const isAtCurrentMonth = computed(() => month.value >= currentMonth);
  const displayedPickerMonth = computed(() => convertIsoMonthToPickerMonth(month.value));
  const currentYear = convertIsoMonthToPickerMonth(currentMonth).year;
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
  const pickerYearId = useId();

  /**
   * Catches focus wherever the clicked button gets disabled or closes with the menu.
   * Found by id, because the menu's activator props replace a template ref.
   */
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

  function showNextPickerYear() {
    pickerYear.value++;

    if (pickerYear.value >= currentYear) {
      // Moves focus to the year before the next arrow gets disabled.
      document.getElementById(pickerYearId)?.focus();
    }
  }
</script>
