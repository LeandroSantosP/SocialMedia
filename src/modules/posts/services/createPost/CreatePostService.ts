import { AppError } from "../../../../errors/appErros";
import { PostDTO } from "../../../shared/dtos/PostDTO";
import { IPostDTO } from "../../../shared/Repositorys/PostRepository/CreatePostDTO";

export type CreatePostServiceDTO = {
  title: string;
  visible: boolean;
  authorId: number;
  content?: string;
};

export class CreatePostService {
  constructor(private createPostRepository: IPostDTO) {}
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
    console.log(newPost);

    return newPost;
  }
}
