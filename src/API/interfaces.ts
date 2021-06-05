import { UserId } from 'interfaces';

export type User = {
  id: UserId | null,
  fullName: string | null,
  phone: string | null,
  email: string | null,
  bio: string | null,
  profileImageUrl: string | null,
};
