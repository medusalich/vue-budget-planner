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
  return form.enteredNote !== '';
}
