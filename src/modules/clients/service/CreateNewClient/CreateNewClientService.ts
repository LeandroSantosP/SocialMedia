import { ClientRepositoryContractProps } from "../../../shared/Repositorys/ClientRepository/client-repository-contract";
import { ClientRepository } from "../../../shared/Repositorys/ClientRepository/implemetations/ClientRepository";

export class ClientService {
  constructor(private createClientRepository: ClientRepository) {}

  async execute({ email, name, password, bio }: ClientRepositoryContractProps) {
    const result = await this.createClientRepository.create({
      bio,
      email,
      name,
      password,
    });

    return result;
  }
}
