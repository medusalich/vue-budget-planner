import type { CategoryType } from '~/types';

export interface TransactionForm {
  selectedCategoryType: CategoryType | null;
  selectedCategoryId: string | null;
  enteredAmount: string;
  enteredBookedOn: string;
  selectedAccountId: string | null;
  enteredNote: string;
}

export function hasAnyEnteredValue(form: TransactionForm): boolean {
  return Object.values(form).some((value) => value !== null && value !== '');
}

/**
 * Reports whether any field differs from the form as it was when editing started.
 *
 * Compares the text as entered, not its meaning: `'1,5'` and `'1,50'` count as a
 * change although the amount is the same. This is deliberate: asking once too often
 * is preferred over missing a change.
 */
export function hasTransactionFormChanged(
  formAtStart: TransactionForm,
  currentForm: TransactionForm,
): boolean {
  const fieldNames = Object.keys(currentForm) as (keyof TransactionForm)[];
  return fieldNames.some((fieldName) => currentForm[fieldName] !== formAtStart[fieldName]);
}
