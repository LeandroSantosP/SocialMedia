import { PostDTO } from "../../../shared/dtos/PostDTO";
import { CreatePostProps } from "modules/posts/infra/prisma/Post";
import { Review } from "@prisma/client";
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

  abstract getAllPost(): Promise<
    {
      id: string;
      title: string;
      visible: boolean;
      content: string | null;
      created_at: Date;
      IsPublished: boolean;
      review: Review[];
      CategoriesOnPosts: {
        category: {
          name: string;
        };
      }[];
      author: {
        id: number;
        name: string;
      };
    }[]
  >;

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
