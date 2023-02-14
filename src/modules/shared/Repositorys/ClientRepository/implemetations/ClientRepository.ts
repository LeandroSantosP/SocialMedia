import { prisma } from "../../../../prisma/client";
import {
  ClientRepositoryContract,
  ClientRepositoryContractProps,
} from "../client-repository-contract";
import { IntClient } from "../../../entities/Client";

export class ClientRepository implements ClientRepositoryContract {
  async create({
    bio,
    email,
    name,
    password,
  }: ClientRepositoryContractProps): Promise<string> {
    const clientResult = IntClient.create({
      bio,
      email,
      name,
      password,
    });

    await prisma.client.create({
      data: {
        bio: clientResult.props.bio,
        email: clientResult.props.email,
        name: clientResult.props.name,
        password: clientResult.props.email,
      },
    });

    return "Account Create With Success!";
  }
}
