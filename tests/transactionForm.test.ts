import { describe, it, expect } from 'vitest';
import { hasAnyEnteredValue } from '../app/utils/transactionForm';
import type { TransactionForm } from '../app/utils/transactionForm';

const emptyTransactionForm: TransactionForm = {
  selectedCategoryType: null,
  selectedCategoryId: null,
  enteredAmount: '',
  enteredBookedOn: '',
  selectedAccountId: null,
  enteredNote: '',
};

const filledFields: { filledField: keyof TransactionForm; filledValue: string }[] = [
  { filledField: 'selectedCategoryType', filledValue: 'income' },
  { filledField: 'selectedCategoryId', filledValue: 'salary' },
  { filledField: 'enteredAmount', filledValue: '12,50' },
  { filledField: 'enteredBookedOn', filledValue: '2026-09-15' },
  { filledField: 'selectedAccountId', filledValue: 'user-1' },
  { filledField: 'enteredNote', filledValue: 'Wocheneinkauf' },
];

describe('hasAnyEnteredValue', () => {
  it('reports no entered value for an untouched form', () => {
    expect(hasAnyEnteredValue(emptyTransactionForm)).toBe(false);
  });

  it.each(filledFields)(
    'reports an entered value for a filled $filledField',
    ({ filledField, filledValue }) => {
      const withOneFilledField = { ...emptyTransactionForm, [filledField]: filledValue };
      expect(hasAnyEnteredValue(withOneFilledField)).toBe(true);
    },
  );
});
