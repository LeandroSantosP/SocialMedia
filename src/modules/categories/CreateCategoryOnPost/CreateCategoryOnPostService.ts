import { inject, injectable } from "tsyringe";
import { AppError } from "../../../errors/appErros";
import { CategoryOnPostContract } from "../../shared/Repositorys/CreateCategoryOnPostDService.ts/categoryonpost-repository-contract";

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

    if (!PostExists) {
      throw new AppError("Post does not exists!");
    }

    await this.CategoryOnPostRepository.create(categoryId, postId);
  }
}
