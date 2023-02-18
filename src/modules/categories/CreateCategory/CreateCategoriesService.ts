import { inject, injectable, isValueProvider } from "tsyringe";

import { AppError } from "../../../middlewares/appErros";
import { ICategoriesContract } from "../../shared/Repositorys/CategoriesRepository/categories-repository-contract";
import { ClientRepositoryContract } from "../../../modules/shared/Repositorys/ClientRepository/client-repository-contract";

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
    private createCategoryRepository: ICategoriesContract,

    @inject("ClientRepository")
    private ClientRepository: ClientRepositoryContract
  ) {}

  async execute({ description, name, slug, client_id }: CreateCategoriesDTO) {
    const clientInfos = await this.ClientRepository.GetClientById(client_id);

    if (clientInfos) {
      const clientInfosArr = Object.entries(clientInfos);

      for (let [key, value] of clientInfosArr) {
        if (key !== "IsAdmin" && value === false) {
          continue;
        }

        /* Inspection -  just admins can create a new category */
      }
    }

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
