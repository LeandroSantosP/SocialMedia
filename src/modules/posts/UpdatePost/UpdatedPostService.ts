import { AppError } from "../../shared/infra/http/middlewares/appErros";
import { inject, injectable } from "tsyringe";
import { IPostContract } from "../infra/repositories/create-post-contract";

interface IRequest {
  post_id: string;
  content: string;
  IsPublished: boolean;
  client_id: number;
  title: string;
}

@injectable()
export class UpdatePostService {
  constructor(
    @inject("PostRepository")
    private PostRepository: IPostContract
  ) {}
  async execute({ post_id, IsPublished, content, client_id, title }: IRequest) {
    const allPost = await this.PostRepository.getAllPost();

    let myPost;

    for (let i = 0; i < allPost.length; i++) {
      if (allPost[i].id === post_id) {
        myPost = allPost[i];
      }
    }

    if (!myPost) {
      throw new AppError("Post Not Found!");
    } else if (myPost?.author.id !== client_id) {
      throw new AppError("Not Authorization");
    }

    const PostUpdated = await this.PostRepository.UpdatePost({
      content,
      IsPublished,
      post_id,
      title,
    });

    return PostUpdated;
  }
}
