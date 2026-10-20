import { describe, it, expect } from 'vitest';
import { hasAnyEnteredValue, hasTransactionFormChanged } from '../app/utils/transactionForm';
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

const prefilledTransactionForm: TransactionForm = {
  selectedCategoryType: 'income',
  selectedCategoryId: 'salary',
  enteredAmount: '12,50',
  enteredBookedOn: '2026-09-15',
  selectedAccountId: 'user-1',
  enteredNote: 'Wocheneinkauf',
};

const changedTransactionFields: { changedField: keyof TransactionForm; changedValue: string }[] = [
  { changedField: 'selectedCategoryType', changedValue: 'expense' },
  { changedField: 'selectedCategoryId', changedValue: 'housing' },
  { changedField: 'enteredAmount', changedValue: '120,50' },
  { changedField: 'enteredBookedOn', changedValue: '2026-07-03' },
  { changedField: 'selectedAccountId', changedValue: 'user-2' },
  { changedField: 'enteredNote', changedValue: 'Nebenkosten Juli' },
];

describe('hasTransactionFormChanged', () => {
  it('reports no change for an untouched form', () => {
    const untouchedCopy = { ...prefilledTransactionForm };
    expect(hasTransactionFormChanged(prefilledTransactionForm, untouchedCopy)).toBe(false);
  });

  it.each(changedTransactionFields)(
    'reports a change for a changed $changedField',
    ({ changedField, changedValue }) => {
      const withOneChangedField = { ...prefilledTransactionForm, [changedField]: changedValue };
      expect(hasTransactionFormChanged(prefilledTransactionForm, withOneChangedField)).toBe(true);
    },
  );
});
