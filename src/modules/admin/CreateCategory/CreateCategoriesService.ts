import { inject, injectable } from "tsyringe";

import { AppError } from "../../shared/infra/http/middlewares/appErros";
import { ICategoriesContract } from "../../categories/infra/repository/categories-repository-contract";

export type CreateCategoriesDTO = {
  name: string;
  description: string;
  slug: string;
  client_id: number;
};

@injectable()
export class CreateCategoriesService {
  constructor(
    @inject("CategoriesRepository")
    private createCategoryRepository: ICategoriesContract
  ) {}

  async execute({ description, name, slug, client_id }: CreateCategoriesDTO) {
    const AllCategoriesObj = await this.createCategoryRepository.list();

    const allCategories = Object.entries(AllCategoriesObj);

    for (let category of allCategories) {
      if (category[1].slug === slug) {
        throw new AppError("Slug Already Exists!");
      }
    }

    const NameAlreadyExists =
      await this.createCategoryRepository.findUniqueByName(name);

    if (NameAlreadyExists) {
      throw new AppError("Name Already Exists!");
    }

    await this.createCategoryRepository.create({
      name,
      slug,
      description,
    });

    return;
  }
}
