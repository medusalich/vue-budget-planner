<template>
  <v-dialog
    v-model="isOpen"
    :max-width="dialogMode === 'create' ? 800 : 400"
    persistent
    no-click-animation
    @click:outside="closeOrAskToDiscard"
    @keydown.esc="goBackOnEscape">
    <v-card :title="dialogMode === 'create' ? 'Buchung erfassen' : undefined">
      <v-form ref="transactionForm" @submit.prevent="saveTransaction" v-if="dialogMode === 'create'">
        <v-card-text>
          <v-radio-group
            v-model="selectedCategoryType"
            inline
            label="Art der Buchung"
            @update:model-value="selectedCategoryId = null"
            :rules="[requireSelection('Art der Buchung wählen')]">
            <v-radio label="Einnahme" value="income" id="category-type-income" />
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

        <v-card-actions class="justify-center">
          <v-btn @click="closeOrAskToDiscard" id="close-dialog-button">Schließen</v-btn>
          <v-btn type="submit" color="primary">Speichern</v-btn>
        </v-card-actions>
      </v-form>
      <template v-else-if="dialogMode === 'confirmDiscard'">
        <div class="text-center pt-6">
          <v-icon icon="mdi-alert-circle-outline" color="error" size="48" />
        </div>
        <v-card-title class="text-center">Eingaben verwerfen?</v-card-title>
        <v-card-actions class="flex-column">
          <v-btn width="220" variant="tonal" @click="continueEditing" id="continue-editing-button">
            Weiter bearbeiten
          </v-btn>
          <v-btn width="220" color="error" variant="flat" @click="discardEnteredFieldsAndClose">
            Verwerfen
          </v-btn>
        </v-card-actions>
      </template>
      <template v-else-if="dialogMode === 'view'">
        <v-card-title>Buchung</v-card-title>
        <v-card-text v-if="transactionToShow">
          <div>Zahlungsdatum: {{ formatIsoDateAsGermanDate(transactionToShow.booked_on) }}</div>
          <div>Kategorie: {{ findCategoryById(transactionToShow.category_id)?.name }}</div>
          <div>Notiz: {{ transactionToShow.note }}</div>
          <div>Betrag: {{ formatCentsAsEuro(transactionToShow.amount_cents) }}</div>
          <div>Konto: {{ findAccountById(transactionToShow.account_id)?.name }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="isOpen = false">Schließen</v-btn>
        </v-card-actions>
      </template>
      <v-snackbar v-model="isSavedNoticeVisible" attach contained location="center" color="success">
        <v-icon icon="mdi-check-circle" /> Buchung gespeichert
      </v-snackbar>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import type { CategoryType } from '~/types';
  import type { SubmitEventPromise } from 'vuetify';

  const props = defineProps<{ transactionId: string | null }>();
  const isOpen = defineModel<boolean>();
  const selectedCategoryType = ref<CategoryType | null>(null);
  const { selectableCategoriesFor, findCategoryById } = useCategories();
  const selectedCategoryId = ref<string | null>(null);

  const selectableCategories = computed(() => {
    if (selectedCategoryType.value === null) {
      return [];
    }
    return selectableCategoriesFor(selectedCategoryType.value);
  });

  const isCategoryTypeMissing = computed(() => selectedCategoryType.value === null);

  const transactionToShow = computed(() =>
    props.transactionId ? findTransactionById(props.transactionId) : undefined,
  );

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

  const { loadAccounts, selectableAccounts, findAccountById } = useAccounts();
  const selectedAccountId = ref<string | null>(null);
  onMounted(loadAccounts);

  function requireSelection(message: string) {
    return (value: string | null) => value !== null || message;
  }

  const enteredNote = ref('');

  const { addTransaction, findTransactionById } = useTransactions();
  const transactionForm = useTemplateRef('transactionForm');

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

    await clearEnteredFields();
    isSavedNoticeVisible.value = true;
    document.getElementById('category-type-income')?.focus();
  }

  async function clearEnteredFields() {
    selectedCategoryType.value = null;
    selectedCategoryId.value = null;
    enteredAmount.value = '';
    enteredBookedOn.value = '';
    selectedAccountId.value = null;
    enteredNote.value = '';

    await nextTick();
    transactionForm.value?.resetValidation();
  }

  const isSavedNoticeVisible = ref(false);

  type TransactionDialogMode = 'create' | 'view' | 'confirmDiscard';
  const dialogMode = ref<TransactionDialogMode>('create');

  async function closeOrAskToDiscard() {
    if (
      !hasAnyEnteredValue({
        selectedCategoryType: selectedCategoryType.value,
        selectedCategoryId: selectedCategoryId.value,
        enteredAmount: enteredAmount.value,
        enteredBookedOn: enteredBookedOn.value,
        selectedAccountId: selectedAccountId.value,
        enteredNote: enteredNote.value,
      })
    ) {
      isOpen.value = false;
      return;
    }
    dialogMode.value = 'confirmDiscard';
    await nextTick();
    document.getElementById('continue-editing-button')?.focus();
  }

  async function discardEnteredFieldsAndClose() {
    await clearEnteredFields();
    dialogMode.value = 'create';
    isOpen.value = false;
  }

  async function continueEditing() {
    dialogMode.value = 'create';
    await nextTick();
    document.getElementById('close-dialog-button')?.focus();
  }

  function goBackOnEscape() {
    if (dialogMode.value === 'confirmDiscard') {
      continueEditing();
      return;
    }
    closeOrAskToDiscard();
  }

  watch(isOpen, (nowOpen) => {
    if (!nowOpen) return;
    dialogMode.value = props.transactionId ? 'view' : 'create';
  });
</script>
