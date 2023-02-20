export type ClientDTO = {
  id?: number;
  name: string;
  email: string;
  bio: string | null;
  createdAt?: Date;
  avatar_url: string | null;
  updatedAt?: Date;
  password: string;
  IsAdmin?: boolean;
};
