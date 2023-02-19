import { ClientRepositoryContract } from "../../clients/infra/repositories/client-repository-contract";
import { ClientDTO } from "../../shared/dtos/ClientDTO";
import { AppError } from "../../shared/infra/http/middlewares/appErros";
import { inject, injectable } from "tsyringe";

interface IRequest {
  client_admin_id: number;
}

@injectable()
export class ADMGetAllClientsInfosService {
  constructor(
    @inject("ClientRepository")
    private ClientRepository: ClientRepositoryContract
  ) {}

  async execute({ client_admin_id }: IRequest): Promise<ClientDTO[]> {
    const allClients = this.ClientRepository.getAllAccounts();

    const IsAdmin = (await allClients).find(
      (client) => client.id == client_admin_id
    );

    if (IsAdmin?.IsAdmin == false || !IsAdmin) {
      throw new AppError("Authorization Error!");
    }

    return allClients;
  }
}
