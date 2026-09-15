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

describe('hasAnyEnteredValue', () => {
  it('reports no entered value for an untouched form', () => {
    expect(hasAnyEnteredValue(emptyTransactionForm)).toBe(false);
  });

  it('reports an entered value for a filled note', () => {
    const withEnteredNote = { ...emptyTransactionForm, enteredNote: 'Wocheneinkauf' };
    expect(hasAnyEnteredValue(withEnteredNote)).toBe(true);
  });
});
