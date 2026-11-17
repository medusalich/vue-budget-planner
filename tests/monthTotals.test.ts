import { describe, it, expect } from 'vitest';
import { calculateMonthTotals } from '../app/utils/monthTotals';
import type { Category, Transaction } from '../app/types';

const salaryCategory: Category = {
  id: 'salary',
  name: 'Gehalt',
  type: 'income',
  icon: 'mdi-cash',
  color: '#2e7d32',
  is_archived: false,
};

const groceriesCategory: Category = {
  id: 'groceries',
  name: 'Lebensmittel',
  type: 'expense',
  icon: 'mdi-cart',
  color: '#c62828',
  is_archived: false,
};

const categories: Category[] = [salaryCategory, groceriesCategory];

const salaryTransaction: Transaction = {
  id: 'tx-901',
  amount_cents: 250000,
  booked_on: '2026-11-01',
  category_id: 'salary',
  account_id: 'user-1-account',
  note: null,
  created_by: 'user-1',
  created_at: '2026-11-01T08:00:00Z',
};

const groceriesTransaction: Transaction = {
  id: 'tx-902',
  amount_cents: 4000,
  booked_on: '2026-11-30',
  category_id: 'groceries',
  account_id: 'user-1-account',
  note: null,
  created_by: 'user-1',
  created_at: '2026-11-30T18:00:00Z',
};

describe('calculateMonthTotals', () => {
  it('returns zero for everything when there are no transactions', () => {
    expect(calculateMonthTotals([], [])).toEqual({
      incomeCents: 0,
      expenseCents: 0,
      balanceCents: 0,
    });
  });

  it('counts an income transaction as income and adds it to the balance', () => {
    expect(calculateMonthTotals([salaryTransaction], categories)).toEqual({
      incomeCents: 250000,
      expenseCents: 0,
      balanceCents: 250000,
    });
  });

  it('counts an expense transaction as expense and subtracts it from the balance', () => {
    expect(calculateMonthTotals([salaryTransaction, groceriesTransaction], categories)).toEqual({
      incomeCents: 250000,
      expenseCents: 4000,
      balanceCents: 246000,
    });
  });
});
