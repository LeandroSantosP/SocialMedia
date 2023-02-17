import {
  ClientRepositoryContract,
  ClientRepositoryContractProps,
} from "../../shared/Repositorys/ClientRepository/client-repository-contract";
import bcrypt from "bcrypt";
import { AppError } from "../../../middlewares/appErros";

export class CreateNewClientService {
  private name?: string;

  constructor(
    private createClientRepository: ClientRepositoryContract,
    name?: string
  ) {
    this.name = name;
  }

  async execute({
    email,
    name,
    password,
    bio,
    avatar_url,
  }: ClientRepositoryContractProps) {
    const allClients = await this.createClientRepository.getAllAccounts();

    const ClientAlreadyExists = allClients.some(
      (client) => client.email === email
    );

    if (ClientAlreadyExists) {
      throw new AppError("Email already Exists!");
    }
    const hashPassword = await bcrypt.hash(password, 9);

    const result = await this.createClientRepository.create({
      bio,
      email,
      name,
      password: hashPassword,
      avatar_url,
    });

    const { password: _, ...ClientInfos } = result;

    return ClientInfos;
  }
}
