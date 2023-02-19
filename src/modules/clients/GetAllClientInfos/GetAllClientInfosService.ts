import { inject, injectable } from "tsyringe";
import { AppError } from "../../shared/infra/http/middlewares/appErros";
import { ClientDTO } from "../../shared/dtos/ClientDTO";
import { ClientRepositoryContract } from "../infra/repositories/client-repository-contract";

interface IRequest {
  user_id: number;
}

@injectable()
export class GetAllClientInfosService {
  constructor(
    @inject("ClientRepository")
    private clientRepository: ClientRepositoryContract
  ) {}

  async execute({ user_id }: IRequest): Promise<Omit<ClientDTO, "updatedAt">> {
    const user = await this.clientRepository.GetClientById(user_id);

    if (!user) {
      throw new AppError("Authentication Failed");
    }

    const { updatedAt: _, ...rest } = user;

    return rest;
  }
}
