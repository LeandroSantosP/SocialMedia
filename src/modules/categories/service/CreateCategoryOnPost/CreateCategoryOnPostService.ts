import { AppError } from "../../../../errors/appErros";
import { ContractCategoryOnPostRepository } from "../../../shared/Repositorys/CreateCategoryOnPostDService.ts/categoryonpost-repository-contract";

export type CreateCategoryOnPostDTO = {
  postId: string;
  categoryId: string;
};

export class CreateCategoryOnPostService {
  constructor(
    private CategoryOnPostRepository: ContractCategoryOnPostRepository
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
