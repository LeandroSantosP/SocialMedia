import { inject, injectable } from "tsyringe";
import { deleteFile } from "../../../utils/file";
import { ClientRepositoryContract } from "../../shared/Repositorys/ClientRepository/client-repository-contract";

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

    if (client?.avatar_url) {
      await deleteFile(`./tmp/avatar/${client?.avatar_url}`);
    }

    return await this.ClientRepository.updatedClientAvatar(
      avatar_file,
      user_id
    );
  }
}
