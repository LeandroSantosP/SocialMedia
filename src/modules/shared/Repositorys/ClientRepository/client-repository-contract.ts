import { ClientDTO } from "../../dtos/ClientDTO";

export interface ClientRepositoryContractProps {
  name: string;
  bio: string | null;
  email: string;
  password: string;
  avatar_url: string | null;
}

export interface GetAllPostsProps {
  id: number;
}

export interface GetUniquePostOfClientProps extends GetAllPostsProps {
  postId: string;
}

export abstract class ClientRepositoryContract {
  abstract create({
    bio,
    email,
    name,
    password,
    avatar_url,
  }: ClientRepositoryContractProps): Promise<void>;

  abstract getAllAccounts(): Promise<ClientDTO[]>;

  abstract GetAllPostsOfClient({ id }: GetAllPostsProps): Promise<
    {
      id: string;
      title: string;
      content: string | null;
      created_at: Date;
      authorId: number;
      comments: {
        id: string;
        created_at: Date;
        authorName: string;
        comment: string;
        authorId: number;
      }[];
      IsPublished: boolean;
      IsActive: boolean;
      updated_At: Date;
    }[]
  >;

  abstract GetClientByEmail(email: string): Promise<ClientDTO | null>;
  abstract GetClientById(id: number): Promise<ClientDTO | null>;

  abstract GetUniquePostOfClient({
    id,
    postId,
  }: GetUniquePostOfClientProps): Promise<{
    id: number;
    name: string;
    bio: string | null;
    posts: {
      title: string;
      content: string | null;
      visible: boolean;
      created_at: Date;
      comments: {
        id: string;
        created_at: Date;
        authorName: string;
        comment: string;
        authorId: number;
      }[];
    }[];
  } | null>;

  abstract updatedClientAvatar(
    avatarRef: string | null,
    userId: number
  ): Promise<void>;
}
