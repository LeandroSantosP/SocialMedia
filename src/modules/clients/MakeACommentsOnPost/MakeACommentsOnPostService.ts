import { inject, injectable } from "tsyringe";
import { IPostContract } from "../../posts/infra/repositories/create-post-contract";
import { CommentsRepositoryContract } from "../../shared/Repositorys/CommentsRepository/comment-repository-contract";
import { AppError } from "../../shared/infra/http/middlewares/appErros";
import { ClientRepositoryContract } from "../infra/repositories/client-repository-contract";
import { PostDTO } from "../../shared/dtos/PostDTO";
import { reviewDTO } from "../../review/infra/prisma/ReviewDTO";

interface IRequest {
  comment: string;
  postId: string;
  client_id: number;
}

@injectable()
export class MakeACommentsOnPostService {
  constructor(
    @inject("CommentsRepository")
    private commentsRepository: CommentsRepositoryContract,

    @inject("PostRepository")
    private postRepository: IPostContract,

    @inject("ClientRepository")
    private clientRepository: ClientRepositoryContract
  ) {}

  async execute({ comment, postId, client_id }: IRequest): Promise<void> {
    const allPosts = (await this.postRepository.getAllPost()) as (PostDTO & {
      CategoriesOnPosts: {
        category: {
          name: string;
          slug: string;
        };
      }[];
      comments: Comment[];
      review: reviewDTO[];
      author: {
        id: number;
        avatar_url: string | null;
        name: string;
        IsAdmin: boolean;
      };
    })[];

    const client = await this.clientRepository.GetClientById(client_id);

    let authorExists: boolean[] = [];

    allPosts.forEach((post) => {
      const HaveSomethingAuthor = post.author.id === client?.id;
      return authorExists.push(HaveSomethingAuthor);
    });

    if (!authorExists.includes(true)) {
      throw new AppError("Client does not Exists!");
    }

    const postExists = allPosts.some((post) => post.id === postId);

    if (!postExists) {
      throw new AppError("Post does not Exists!");
    }

    if (client)
      return await this.commentsRepository.create({
        authorId: client.id ?? 0,
        authorName: client?.name,
        comment,
        postId,
      });
  }
}
