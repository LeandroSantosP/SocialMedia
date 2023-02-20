import { Post } from "@prisma/client";
import { PostDTO } from "modules/shared/dtos/PostDTO";
import { CreatePostProps } from "../../prisma/Post";
import { IPostContract, UpdatePostProps } from "../create-post-contract";

export class PostRepositoryInMemory implements IPostContract {
  GetAllPostForSearch(
    search: string,
    take: number,
    skip: number
  ): Promise<PostDTO[]> {
    throw new Error("Method not implemented.");
  }
  private Post: Post[] = [];

  async getAllPost(): Promise<Post[]> {
    const allPost = this.Post;

    return allPost;
  }

  findBySlug(slug: string): Promise<PostDTO | null> {
    throw new Error("Method not implemented.");
  }
  UpdatePost({
    IsPublished,
    content,
    post_id,
    title,
  }: UpdatePostProps): Promise<PostDTO> {
    throw new Error("Method not implemented.");
  }
  create({ title, visible, content }: CreatePostProps): Promise<PostDTO> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
