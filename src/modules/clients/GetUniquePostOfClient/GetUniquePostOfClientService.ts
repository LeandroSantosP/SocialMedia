import {
  ClientRepositoryContract,
  GetUniquePostOfClientProps,
} from "../../shared/Repositorys/ClientRepository/client-repository-contract";

export class GetUniquePostOfClientService {
  constructor(private ClientRepository: ClientRepositoryContract) {}

  async execute({ id, postId }: GetUniquePostOfClientProps) {
    const ClientUniquePost = await this.ClientRepository.GetUniquePostOfClient({
      id,
      postId,
    });

    return ClientUniquePost;
  }
}
