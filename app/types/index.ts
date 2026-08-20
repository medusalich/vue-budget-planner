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
