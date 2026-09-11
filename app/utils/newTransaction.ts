import type { NewTransaction } from '~/types';

export interface EnteredTransactionFields {
  amountCents: number;
  bookedOn: string;
  categoryId: string;
  accountId: string;
  note: string;
}

export function buildNewTransaction(enteredFields: EnteredTransactionFields): NewTransaction {
  return {
    amount_cents: enteredFields.amountCents,
    booked_on: enteredFields.bookedOn,
    category_id: enteredFields.categoryId,
    account_id: enteredFields.accountId,
    note: enteredFields.note === '' ? null : enteredFields.note,
  };
}
