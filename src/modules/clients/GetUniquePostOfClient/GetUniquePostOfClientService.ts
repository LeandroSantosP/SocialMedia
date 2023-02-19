import { prisma } from "../../prisma/client";
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

    return PostPublished;
  }
}
