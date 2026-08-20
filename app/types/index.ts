export interface Account {
  id: string;
  name: string;
  owner_id: string | null;
  is_archived: boolean;
}
