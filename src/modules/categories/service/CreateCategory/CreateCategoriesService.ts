import { AppError } from "../../../../errors/appErros";
import { ICategoriesDTO } from "../../../shared/Repositorys/CategoriesRepository/CategoriesDTO";

export type CreateCategoriesDTO = {
  name: string;
  description: string;
  slug: string;
};

export class CreateCategoriesService {
  constructor(private createCategoryRepository: ICategoriesDTO) {}

  async execute({ description, name, slug }: CreateCategoriesDTO) {
    const SlugAlreadyExists = await this.createCategoryRepository.findUnique(
      slug
    );

    if (SlugAlreadyExists) {
      throw new AppError("slug Already Exists!");
    }

    const NameAlreadyExists =
      await this.createCategoryRepository.findUniqueByName(name);

    console.log(NameAlreadyExists);

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
