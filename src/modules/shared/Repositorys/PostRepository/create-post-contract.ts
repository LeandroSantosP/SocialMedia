import { PostDTO } from "../../dtos/PostDTO";
import { CreatePostProps } from "../../entities/Post";
export interface findBySlugProps {
  title: string;
}

export abstract class IPostContract {
  abstract findBySlug(slug: string): Promise<PostDTO | null>;

  abstract getAllPost(): Promise<
    {
      title: string;
      visible: boolean;
      content: string | null;
      created_at: Date;
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
}
