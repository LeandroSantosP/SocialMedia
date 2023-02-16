import { inject, injectable } from "tsyringe";
import { PostDTO } from "../../shared/dtos/PostDTO";
import { ClientRepositoryContract } from "../../shared/Repositorys/ClientRepository/client-repository-contract";

export interface GetAllPostOfClientServiceRequest {
  id: number;
}

@injectable()
export class GetAllPostOfClientService {
  constructor(
    @inject("ClientRepository")
    private ClientRepository: ClientRepositoryContract
  ) {}

  async execute({ id }: GetAllPostOfClientServiceRequest) {
    const Posts = await this.ClientRepository.GetAllPostsOfClient({
      id,
    });

    return Posts;
  }
}
