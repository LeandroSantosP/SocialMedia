import { PostDTO } from "../../../shared/dtos/PostDTO";
import { ClientRepository } from "../../../shared/Repositorys/ClientRepository/implemetations/ClientRepository";

export interface GetAllPostOfClientServiceRequest {
  id: number;
}

export class GetAllPostOfClientService {
  constructor(private ClientRepository: ClientRepository) {}

  async execute({ id }: GetAllPostOfClientServiceRequest): Promise<PostDTO[]> {
    const Posts = await this.ClientRepository.GetAllPostsOfClient({
      id,
    });

    return Posts;
  }
}
