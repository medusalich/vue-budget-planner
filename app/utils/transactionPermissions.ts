import type { Transaction } from '~/types';

export function mayBeEditedBy(transaction: Transaction, memberId: string): boolean {
  return transaction.created_by === memberId;
}
