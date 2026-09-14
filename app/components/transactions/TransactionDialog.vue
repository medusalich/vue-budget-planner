<template>
  <v-dialog v-model="isOpen">
    <v-card title="Buchung erfassen">
      <v-card-text>
        <v-radio-group
          v-model="selectedCategoryType"
          inline
          label="Art der Buchung"
          @update:model-value="selectedCategoryId = null">
          <v-radio label="Einnahme" value="income" />
          <v-radio label="Ausgabe" value="expense" />
        </v-radio-group>
        <v-select
          v-model="selectedCategoryId"
          :items="selectableCategories"
          item-title="name"
          item-value="id"
          label="Kategorie"
          :disabled="isCategoryTypeMissing"
          :hint="isCategoryTypeMissing ? 'Erst die Art der Buchung wählen' : undefined"
          persistent-hint />
        <v-text-field
          v-model="enteredAmount"
          label="Betrag"
          suffix="€"
          inputmode="decimal"
          :rules="[validateEnteredAmount]" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="isOpen = false">Schließen</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import type { CategoryType } from '~/types';

  const isOpen = defineModel<boolean>();
  const selectedCategoryType = ref<CategoryType | null>(null);
  const { selectableCategoriesFor } = useCategories();
  const selectedCategoryId = ref<string | null>(null);

  const selectableCategories = computed(() => {
    if (selectedCategoryType.value === null) {
      return [];
    }
    return selectableCategoriesFor(selectedCategoryType.value);
  });

  const isCategoryTypeMissing = computed(() => selectedCategoryType.value === null);

  const enteredAmount = ref('');

  function validateEnteredAmount(value: string) {
    return parseAmountToCents(value) !== null || 'Betrag wie 12,50 eingeben, ohne Tausenderpunkt';
  }
</script>
