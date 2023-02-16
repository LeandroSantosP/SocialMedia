import { ICategoriesContract } from "../../../shared/Repositorys/CategoriesRepository/categories-repository-contract";

export class GetAllCategoriesService {
  constructor(private GetAllCategoriesRepository: ICategoriesContract) {}

  async execute() {
    const AllCategoriesWithPost =
      await this.GetAllCategoriesRepository.listAllCategoriesAndPosts();

    return AllCategoriesWithPost;
  }
}
