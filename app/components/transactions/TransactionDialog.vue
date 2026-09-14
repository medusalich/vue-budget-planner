<template>
  <v-dialog v-model="isOpen">
    <v-card title="Buchung erfassen">
      <v-form @submit.prevent="saveTransaction">
        <v-card-text>
          <v-radio-group
            v-model="selectedCategoryType"
            inline
            label="Art der Buchung"
            @update:model-value="selectedCategoryId = null"
            :rules="[requireSelection('Art der Buchung wählen')]">
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
            persistent-hint
            :rules="[requireSelection('Kategorie wählen')]" />

          <v-text-field
            v-model="enteredAmount"
            label="Betrag"
            suffix="€"
            inputmode="decimal"
            :rules="[validateEnteredAmount]" />

          <v-text-field
            v-model="enteredBookedOn"
            type="date"
            label="Zahlungsdatum"
            :max="todayAsIsoDate()"
            :rules="[validateBookedOnIsEntered, validateBookedOnIsNotInFuture]" />

          <v-select
            v-model="selectedAccountId"
            :items="selectableAccounts"
            item-title="name"
            item-value="id"
            label="Konto"
            :rules="[requireSelection('Konto wählen')]" />

          <v-text-field v-model="enteredNote" label="Notiz (optional)" maxlength="60" counter />
        </v-card-text>

        <v-card-actions>
          <v-btn @click="isOpen = false">Schließen</v-btn>
          <v-btn type="submit" color="primary">Speichern</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import type { CategoryType } from '~/types';
  import type { SubmitEventPromise } from 'vuetify';

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

  const enteredBookedOn = ref('');

  function todayAsIsoDate() {
    return formatDateAsIsoDate(new Date());
  }

  function validateBookedOnIsEntered(value: string) {
    return value !== '' || 'Zahlungsdatum wählen';
  }

  function validateBookedOnIsNotInFuture(value: string) {
    return (
      mayBeBookedOn(value, todayAsIsoDate()) || 'Das Zahlungsdatum darf nicht in der Zukunft liegen'
    );
  }

  const { loadAccounts, selectableAccounts } = useAccounts();
  const selectedAccountId = ref<string | null>(null);
  onMounted(loadAccounts);

  function requireSelection(message: string) {
    return (value: string | null) => value !== null || message;
  }

  const enteredNote = ref('');

  const { addTransaction } = useTransactions();

  async function saveTransaction(event: SubmitEventPromise) {
    const { valid } = await event;
    if (!valid) {
      return;
    }

    const amountCents = parseAmountToCents(enteredAmount.value);
    if (amountCents === null || selectedCategoryId.value === null || selectedAccountId.value === null) {
      return;
    }

    await addTransaction(
      buildNewTransaction({
        amountCents,
        bookedOn: enteredBookedOn.value,
        categoryId: selectedCategoryId.value,
        accountId: selectedAccountId.value,
        note: enteredNote.value,
      }),
    );
  }
</script>
