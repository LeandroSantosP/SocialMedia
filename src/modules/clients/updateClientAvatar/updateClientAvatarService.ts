//Adicionar coluna avatar na tabela de clients

import { inject, injectable } from "tsyringe";
import { ClientRepositoryContract } from "../../shared/Repositorys/ClientRepository/client-repository-contract";

//Configuracao upload multer

//Criar a regra de negocio do upload

//Criar nosso controller

interface IRequest {
  user_id: number;
  avatar_file: string | null;
}

@injectable()
export class UpdateClientAvatarService {
  constructor(
    @inject("ClientRepository")
    private ClientRepository: ClientRepositoryContract
  ) {}
  async execute({ avatar_file, user_id }: IRequest): Promise<void> {
    const client = await this.ClientRepository.GetClientById(user_id);

    /* 
      verificar se o avatar_file esta no formato correto!
    */

    return await this.ClientRepository.updatedClientAvatar(
      avatar_file,
      user_id
    );
  }
}
