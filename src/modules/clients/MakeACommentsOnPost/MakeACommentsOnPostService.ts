import { inject, injectable } from "tsyringe";
import { IPostContract } from "../../shared/Repositorys/PostRepository/create-post-contract";
import { CommentsRepositoryContract } from "../../shared/Repositorys/CommentsRepository/comment-repository-contract";
import { AppError } from "../../../middlewares/appErros";

interface IRequest {
  authorName: string;
  comment: string;
  authorId: number;
  postId: string;
}

@injectable()
export class MakeACommentsOnPostService {
  constructor(
    @inject("CommentsRepository")
    private commentsRepository: CommentsRepositoryContract,

    @inject("PostRepository")
    private postRepository: IPostContract
  ) {}

  async execute({
    authorId = 1,
    authorName,
    comment,
    postId,
  }: IRequest): Promise<void> {
    const allPosts = await this.postRepository.getAllPost();

    let authorExists: boolean[] = [];

    allPosts.forEach((post) => {
      const HaveSomethingAuthor = post.author.id === authorId;
      return authorExists.push(HaveSomethingAuthor);
    });

    if (!authorExists.includes(true)) {
      throw new AppError("Client does not Exists!");
    }

    const postExists = allPosts.some((post) => post.id === postId);

    if (!postExists) {
      throw new AppError("Post does not Exists!");
    }

    return await this.commentsRepository.create({
      authorId,
      authorName,
      comment,
      postId,
    });
  }
}
