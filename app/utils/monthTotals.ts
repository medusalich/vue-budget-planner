import type { Category, Transaction } from '~/types';

export interface MonthTotals {
  incomeCents: number;
  expenseCents: number;
  balanceCents: number;
}

/**
 * Adds up income, expenses and balance of the given transactions.
 * Expects transactions already filtered to one month.
 */
export function calculateMonthTotals(transactions: Transaction[], categories: Category[]): MonthTotals {
  let incomeCents = 0;
  let expenseCents = 0;

  for (const transaction of transactions) {
    const category = categories.find((candidate) => candidate.id === transaction.category_id);

    if (category?.type === 'income') {
      incomeCents += transaction.amount_cents;
    } else if (category?.type === 'expense') {
      expenseCents += transaction.amount_cents;
    }
  }

  return { incomeCents, expenseCents, balanceCents: incomeCents - expenseCents };
}
