import { ClientDTO } from "../../dtos/ClientDTO";
import { IntClientCreate } from "../../entities/Client";
import {
  ClientRepositoryContract,
  ClientRepositoryContractProps,
  GetAllPostsProps,
  GetUniquePostOfClientProps,
} from "../ClientRepository/client-repository-contract";

export class ClientRepositoryInMemory implements ClientRepositoryContract {
  clients: ClientDTO[] = [];

  async create({
    bio,
    email,
    name,
    password,
    avatar_url,
  }: ClientRepositoryContractProps): Promise<void> {
    const newClient = IntClientCreate.create({
      avatar_url,
      bio,
      email,
      name,
      password,
    }).props;

    return;
  }
  getAllAccounts(): Promise<ClientDTO[]> {
    throw new Error("Method not implemented.");
  }
  GetAllPostsOfClient({ id }: GetAllPostsProps): Promise<
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
  > {
    throw new Error("Method not implemented.");
  }
  GetClientByEmail(email: string): Promise<ClientDTO | null> {
    throw new Error("Method not implemented.");
  }
  async GetClientById(id: number): Promise<ClientDTO | null> {
    const client = this.clients.find((client) => client.id === id);

    return client ?? null;
  }
  GetUniquePostOfClient({ id, postId }: GetUniquePostOfClientProps): Promise<{
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
  } | null> {
    throw new Error("Method not implemented.");
  }
  updatedClientAvatar(avatarRef: string | null, userId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
