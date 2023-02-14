import { prisma } from "../../../../prisma/client";
import {
  ClientRepositoryContract,
  ClientRepositoryContractProps,
} from "../client-repository-contract";
import { IntClient } from "../../../entities/Client";
import { ClientDTO } from "../../../dtos/ClientDTO";

export class ClientRepository implements ClientRepositoryContract {
  async getAllAccounts(): Promise<ClientDTO[]> {
    const allClient = await prisma.client.findMany();

    return allClient;
  }

  async create({
    bio,
    email,
    name,
    password,
  }: ClientRepositoryContractProps): Promise<ClientDTO> {
    const clientResult = IntClient.create({
      bio,
      email,
      name,
      password,
    });

    const newClient = await prisma.client.create({
      data: {
        bio: clientResult.props.bio,
        email: clientResult.props.email,
        name: clientResult.props.name,
        password: clientResult.props.email,
      },
    });

    return newClient;
  }
}
