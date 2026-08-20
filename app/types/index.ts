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
