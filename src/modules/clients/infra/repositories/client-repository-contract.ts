import { AllPostReturnProps, PostUniqueReturnProps } from "../../types";
import { ClientDTO } from "../../../shared/dtos/ClientDTO";

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

  abstract GetAllPostsOfClient({
    id,
  }: GetAllPostsProps): Promise<AllPostReturnProps[]>;

  abstract GetClientByEmail(email: string): Promise<ClientDTO | null>;
  abstract GetClientById(id: number): Promise<ClientDTO | null>;

  abstract GetUniquePostOfClient({
    id,
    postId,
  }: GetUniquePostOfClientProps): Promise<PostUniqueReturnProps | null>;

  abstract updatedClientAvatar(
    avatarRef: string | null,
    userId: number
  ): Promise<void>;
}
