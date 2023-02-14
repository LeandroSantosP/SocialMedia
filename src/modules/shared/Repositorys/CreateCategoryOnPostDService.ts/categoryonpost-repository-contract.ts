import { CategoryDTO } from "../../dtos/CategoryDTO";
import { PostDTO } from "../../dtos/PostDTO";

export interface PostAlreadyExistsProps {
  postId: string;
}

export abstract class ContractCategoryOnPostRepository {
  abstract create(categoryId: string, postId: string): Promise<void>;

  abstract CategoryExist(categoryId: string): Promise<CategoryDTO | null>;
  abstract PostExist(postId: string): Promise<PostDTO | null>;
}
