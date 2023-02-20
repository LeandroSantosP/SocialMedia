import { AppError } from "../../shared/infra/http/middlewares/appErros";
import { PostDTO } from "../../shared/dtos/PostDTO";
import { IPostContract } from "../infra/repositories/create-post-contract";
import { inject, injectable } from "tsyringe";

export type CreatePostServiceDTO = {
  title: string;
  visible: boolean;
  authorId: number;
  content?: string;
};

@injectable()
export class CreatePostService {
  constructor(
    @inject("PostRepository")
    private createPostRepository: IPostContract
  ) {}
  async execute({
    title,
    visible,
    authorId,
    content,
  }: CreatePostServiceDTO): Promise<PostDTO> {
    const postAlreadyExists = await this.createPostRepository.findBySlug(title);

    if (postAlreadyExists) {
      throw new AppError("Post Already Exists!");
    }

    const newPost = await this.createPostRepository.create({
      title,
      visible,
      authorId,
      content,
    });

    return newPost;
  }
}
