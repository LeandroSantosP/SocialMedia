import { inject, injectable } from "tsyringe";
import { AppError } from "../../../middlewares/appErros";
import { ClientRepositoryContract } from "../../shared/Repositorys/ClientRepository/client-repository-contract";
import { IPostContract } from "../../shared/Repositorys/PostRepository/create-post-contract";

interface IRequest {
  postId: string;
  authorId: number;
}

@injectable()
export class DeletePostService {
  constructor(
    @inject("PostRepository")
    private postRepository: IPostContract,

    @inject("ClientRepository")
    private clientRepository: ClientRepositoryContract
  ) {}

  async execute({ authorId, postId }: IRequest) {
    const client = await this.clientRepository.GetClientById(authorId);

    if (client === null) {
      throw new AppError("Invalid Client");
    }
    const allPostsOfClient = await this.clientRepository.GetAllPostsOfClient({
      id: authorId,
    });

    const post = allPostsOfClient.find((post) => post.id === postId);

    if (!post || post.authorId !== authorId) {
      throw new AppError("Invalid Post for deleted!");
    }

    return await this.postRepository.delete(postId);
  }
}
