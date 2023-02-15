import { PostDTO } from "../../../shared/dtos/PostDTO";
import { ClientRepository } from "../../../shared/Repositorys/ClientRepository/implemetations/ClientRepository";

export interface GetAllPostOfClientServiceRequest {
  email: string;
  password: string;
}

export class GetAllPostOfClientService {
  constructor(private ClientRepository: ClientRepository) {}

  async execute({
    email,
    password,
  }: GetAllPostOfClientServiceRequest): Promise<PostDTO[]> {
    const Posts = await this.ClientRepository.GetAllPostsOfClient({
      email,
      password,
    });

    return Posts;
  }
}
