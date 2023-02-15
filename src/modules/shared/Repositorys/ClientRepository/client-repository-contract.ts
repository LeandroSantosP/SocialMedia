import { ClientDTO } from "../../dtos/ClientDTO";
import { PostDTO } from "../../dtos/PostDTO";

export interface ClientRepositoryContractProps {
  name: string;
  bio: string | null;
  email: string;
  password: string;
}

export interface GetAllPostsProps {
  password: string;
  email: string;
}

export abstract class ClientRepositoryContract {
  abstract create({
    bio,
    email,
    name,
    password,
  }: ClientRepositoryContractProps): Promise<ClientDTO>;

  abstract getAllAccounts(): Promise<ClientDTO[]>;

  abstract GetAllPostsOfClient({
    email,
    password,
  }: GetAllPostsProps): Promise<PostDTO[]>;
}
