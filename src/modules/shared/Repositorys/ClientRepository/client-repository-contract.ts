import { ClientDTO } from "../../dtos/ClientDTO";
import { PostDTO } from "../../dtos/PostDTO";

export interface ClientRepositoryContractProps {
  name: string;
  bio: string | null;
  email: string;
  password: string;
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
  }: ClientRepositoryContractProps): Promise<ClientDTO>;

  abstract getAllAccounts(): Promise<ClientDTO[]>;

  abstract GetAllPostsOfClient({ id }: GetAllPostsProps): Promise<PostDTO[]>;

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
    }[];
  } | null>;
}
