import { AppError } from "../../shared/infra/http/middlewares/appErros";
import { inject, injectable } from "tsyringe";
import { ICategoriesContract } from "../infra/repository/categories-repository-contract";

@injectable()
export class DeleteCategoryService {
  constructor(
    @inject("CategoriesRepository")
    private CategoryRepository: ICategoriesContract
  ) {}

  async execute(category_id: string) {
    const allCategory = await this.CategoryRepository.list();

    const CategoryExists = allCategory.some((cate) => cate.id === category_id);

    if (!CategoryExists) {
      throw new AppError("Invalid Category id!");
    }

    const CategoryDeleted = this.CategoryRepository.DeleteCategory(category_id);

    return CategoryDeleted;
  }
}
