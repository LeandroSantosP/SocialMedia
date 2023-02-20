import { PostDTO } from "../../../shared/dtos/PostDTO";
import { CreatePostProps } from "../../../posts/infra/prisma/Post";
import { Post } from "@prisma/client";
export interface findBySlugProps {
  title: string;
}

export interface UpdatePostProps {
  post_id: string;
  content: string;
  IsPublished: boolean;
  title: string;
}

export abstract class IPostContract {
  abstract findBySlug(slug: string): Promise<PostDTO | null>;

  abstract getAllPost(): Promise<PostDTO[]>;

  abstract GetAllPostForSearch(
    search: string,
    take: number,
    skip: number
  ): Promise<Post[]>;

  abstract UpdatePost({
    IsPublished,
    content,
    post_id,
    title,
  }: UpdatePostProps): Promise<PostDTO>;

  abstract create({
    title,
    visible,
    content,
  }: CreatePostProps): Promise<PostDTO>;

  abstract delete(id: string): Promise<void>;
}
