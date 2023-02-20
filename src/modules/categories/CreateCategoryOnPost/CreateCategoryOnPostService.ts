import { inject, injectable } from "tsyringe";
import { AppError } from "../../shared/infra/http/middlewares/appErros";
import { CategoryOnPostContract } from "../infra/repository/categoryonpost-repository-contract";

export type CreateCategoryOnPostDTO = {
  postId: string;
  categoryId: string;
};

@injectable()
export class CreateCategoryOnPostService {
  constructor(
    @inject("CategoryOnPostRepository")
    private CategoryOnPostRepository: CategoryOnPostContract
  ) {}

  async execute({
    categoryId,
    postId,
  }: CreateCategoryOnPostDTO): Promise<void> {
    const categoryExists = await this.CategoryOnPostRepository.CategoryExist(
      categoryId
    );

    if (!categoryExists) {
      throw new AppError("Category does not exists!");
    }
    const PostExists = await this.CategoryOnPostRepository.PostExist(postId);

    const PostAlreadyExistsInCategory =
      await this.CategoryOnPostRepository.GetPostOrCategoryExists(
        categoryId,
        postId
      );

    if (PostAlreadyExistsInCategory) {
      throw new AppError("Post Already In This Category!!");
    }

    if (!PostExists) {
      throw new AppError("Post does not exists!");
    }

    await this.CategoryOnPostRepository.create(categoryId, postId);
  }
}
