import { PostDTO } from "../../../shared/dtos/PostDTO";
import { CreatePostProps } from "modules/posts/infra/prisma/Post";
import { Review } from "@prisma/client";
export interface findBySlugProps {
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

  abstract create({
    title,
    visible,
    content,
  }: CreatePostProps): Promise<PostDTO>;

  abstract delete(id: string): Promise<void>;
}
