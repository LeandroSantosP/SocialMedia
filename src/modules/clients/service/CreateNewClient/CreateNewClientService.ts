import { ClientRepositoryContractProps } from "../../../shared/Repositorys/ClientRepository/client-repository-contract";
import { ClientRepository } from "../../../shared/Repositorys/ClientRepository/implemetations/ClientRepository";
import bcrypt from "bcrypt";
import { AppError } from "../../../../errors/appErros";

export class ClientService {
  constructor(private createClientRepository: ClientRepository) {}

  async execute({ email, name, password, bio }: ClientRepositoryContractProps) {
    const hashPassword = await bcrypt.hash(password, 9);
    const allClients = await this.createClientRepository.getAllAccounts();

    const ClientAlreadyExists = allClients.some(
      (client) => client.email === email
    );

    if (ClientAlreadyExists) {
      return new AppError("Email already Exists!");
    }

    const result = await this.createClientRepository.create({
      bio,
      email,
      name,
      password: hashPassword,
    });

    const { password: _, ...ClientInfos } = result;

    return ClientInfos;
  }
}
