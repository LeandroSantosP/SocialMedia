import { AllPostReturnProps, PostUniqueReturnProps } from "../../../types/";
import { ClientDTO } from "../../../../shared/dtos/ClientDTO";
import { IntClientCreate } from "../../prisma/Client";
import {
  ClientRepositoryContract,
  ClientRepositoryContractProps,
  GetAllPostsProps,
  GetUniquePostOfClientProps,
} from "../client-repository-contract";

export class ClientRepositoryInMemory implements ClientRepositoryContract {
  GetAllPostsOfClient({ id }: GetAllPostsProps): Promise<AllPostReturnProps[]> {
    throw new Error("Method not implemented.");
  }
  GetUniquePostOfClient({
    id,
    postId,
  }: GetUniquePostOfClientProps): Promise<PostUniqueReturnProps | null> {
    throw new Error("Method not implemented.");
  }
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

  async GetClientByEmail(email: string): Promise<ClientDTO | null> {
    return this.clients.find((client) => client.email === email) ?? null;
  }
  async GetClientById(id: number): Promise<ClientDTO | null> {
    return this.clients.find((client) => client.id === id) ?? null;
  }

  updatedClientAvatar(avatarRef: string | null, userId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
