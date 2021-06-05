import { UserId } from 'interfaces';

export type User = {
  id: UserId,
  fullName: string,
  phone: string,
  email: string,
  bio: string | null,
  profileImageUrl: string,
};
