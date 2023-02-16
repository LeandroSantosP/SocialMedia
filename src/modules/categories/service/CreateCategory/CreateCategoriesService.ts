import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/appErros";
import { ICategoriesContract } from "../../../shared/Repositorys/CategoriesRepository/categories-repository-contract";

export type CreateCategoriesDTO = {
  name: string;
  description: string;
  slug: string;
};

@injectable()
export class CreateCategoriesService {
  constructor(
    @inject("CategoriesRepository")
    private createCategoryRepository: ICategoriesContract
  ) {}

  async execute({ description, name, slug }: CreateCategoriesDTO) {
    const SlugAlreadyExists = await this.createCategoryRepository.findUnique(
      slug
    );

    if (SlugAlreadyExists) {
      throw new AppError("slug Already Exists!");
    }

    const NameAlreadyExists =
      await this.createCategoryRepository.findUniqueByName(name);

    if (NameAlreadyExists) {
      throw new AppError("Name Already Exists!");
    }

    const newCategory = await this.createCategoryRepository.create({
      name,
      slug,
      description,
    });

    return newCategory;
  }
}
