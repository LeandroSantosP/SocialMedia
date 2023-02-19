import { AppError } from "../../shared/infra/http/middlewares/appErros";
import {
  ClientRepositoryContract,
  GetUniquePostOfClientProps,
} from "../infra/repositories/client-repository-contract";

export class GetUniquePostOfClientService {
  constructor(private ClientRepository: ClientRepositoryContract) {}

  async execute({ id, postId }: GetUniquePostOfClientProps) {
    const ClientUniquePost = await this.ClientRepository.GetUniquePostOfClient({
      id,
      postId,
    });

    const PostPublished = ClientUniquePost?.posts.filter(
      (post) => post.IsPublished !== false
    );

    if (PostPublished?.length === 0) {
      throw new AppError("Post not Published!");
    }

    return PostPublished;
  }
}
