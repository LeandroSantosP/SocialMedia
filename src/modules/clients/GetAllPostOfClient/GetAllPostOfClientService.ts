import { inject, injectable } from "tsyringe";
import { ClientRepositoryContract } from "../infra/repositories/client-repository-contract";

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

    const postPlublished = Posts.filter((post) => post.IsPublished !== false);

    console.log(postPlublished);

    return postPlublished;
  }
}
