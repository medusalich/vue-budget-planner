import type { Account } from '~/types';

export const mockAccounts: Account[] = [
  { id: 'joint-account', name: 'Gemeinsames Konto', owner_id: null, is_archived: false },
  { id: 'house-account', name: 'Hauskonto', owner_id: null, is_archived: false },
  { id: 'user-1-account', name: 'Konto User 1', owner_id: 'user-1', is_archived: false },
  { id: 'user-1-cash', name: 'Bargeld User 1', owner_id: 'user-1', is_archived: false },
  { id: 'user-2-account', name: 'Konto User 2', owner_id: 'user-2', is_archived: false },
  { id: 'user-2-cash', name: 'Bargeld User 2', owner_id: 'user-2', is_archived: false },
  { id: 'unknown', name: 'Unbekannt', owner_id: null, is_archived: false },
];
