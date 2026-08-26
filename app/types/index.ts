export interface Account {
  id: string;
  name: string;
  owner_id: string | null;
  is_archived: boolean;
}

export interface Profile {
  id: string;
  display_name: string;
}

export type CategoryType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  type: CategoryType;
  icon: string;
  color: string;
  is_archived: boolean;
}

export interface Transaction {
  id: string;
  amount_cents: number;
  booked_on: string;
  category_id: string;
  account_id: string;
  note: string | null;
  created_by: string;
  created_at: string;
}

export type NewTransaction = Omit<Transaction, 'id' | 'created_by' | 'created_at'>;
