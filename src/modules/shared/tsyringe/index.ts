import { container } from "tsyringe";
import { ICategoriesContract } from "../Repositorys/CategoriesRepository/categories-repository-contract";
import { CategoriesRepository } from "../Repositorys/CategoriesRepository/implementations/CategoriesRepository";
import { CategoryOnPostContract } from "../Repositorys/CreateCategoryOnPostDService.ts/categoryonpost-repository-contract";
import { CategoryOnPostRepository } from "../Repositorys/CreateCategoryOnPostDService.ts/implemetation/CategoryOnPostRepository";

container.registerSingleton<ICategoriesContract>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<CategoryOnPostContract>(
  "CategoryOnPostRepository",
  CategoryOnPostRepository
);
