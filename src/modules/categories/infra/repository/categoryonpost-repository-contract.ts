import { CategoriesOnPosts } from "@prisma/client";
import { CategoryDTO } from "../../../shared/dtos/CategoryDTO";
import { PostDTO } from "../../../shared/dtos/PostDTO";

export interface PostAlreadyExistsProps {
  postId: string;
}

export abstract class CategoryOnPostContract {
  abstract create(categoryId: string, postId: string): Promise<void>;

  abstract CategoryExist(categoryId: string): Promise<CategoryDTO | null>;
  abstract PostExist(postId: string): Promise<PostDTO | null>;

  abstract GetPostOrCategoryExists(
    category_id: string,
    post_id: string
  ): Promise<CategoriesOnPosts | null>;
}
