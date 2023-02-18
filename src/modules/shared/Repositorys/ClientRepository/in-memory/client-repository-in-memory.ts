import { ClientDTO } from "../../../dtos/ClientDTO";
import { IntClientCreate } from "../../../entities/Client";
import {
  ClientRepositoryContract,
  ClientRepositoryContractProps,
  GetAllPostsProps,
  GetUniquePostOfClientProps,
} from "../client-repository-contract";

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
      avatar_url: avatar_url,
      bio,
      createdAt: new Date(),
      updatedAt: new Date(),
      email,
      id: Math.random(),
      IsAdmin: false,
      name,
      password,
    }).props;

    this.clients.push(newClient);

    return;
  }
  async getAllAccounts(): Promise<ClientDTO[]> {
    return this.clients;
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
  async GetClientByEmail(email: string): Promise<ClientDTO | null> {
    return this.clients.find((client) => client.email === email) ?? null;
  }
  async GetClientById(id: number): Promise<ClientDTO | null> {
    return this.clients.find((client) => client.id === id) ?? null;
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
