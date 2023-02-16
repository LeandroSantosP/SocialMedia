import { AppError } from "../../../middlewares/appErros";
import { prisma } from "../../prisma/client";
import { PostDTO } from "../../shared/dtos/PostDTO";
import { IPostContract } from "../../shared/Repositorys/PostRepository/create-post-contract";

export type CreatePostServiceDTO = {
  title: string;
  visible: boolean;
  authorId: number;
  content?: string;
};

export class CreatePostService {
  constructor(private createPostRepository: IPostContract) {}
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
