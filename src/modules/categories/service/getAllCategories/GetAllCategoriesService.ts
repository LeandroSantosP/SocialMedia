import { ICategoriesDTO } from "../../../shared/Repositorys/CategoriesRepository/CategoriesDTO";

export class GetAllCategoriesService {
  constructor(private GetAllCategoriesRepository: ICategoriesDTO) {}

  async execute() {
    const AllCategoriesWithPost =
      await this.GetAllCategoriesRepository.listAllCategoriesAndPosts();

    return AllCategoriesWithPost;
  }
}
