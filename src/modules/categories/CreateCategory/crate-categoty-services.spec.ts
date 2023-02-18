import { CategoryRepositoryInMemory } from "../../../modules/shared/Repositorys/in-memory/categories-repository-in-memory";
import { ClientRepositoryInMemory } from "../../../modules/shared/Repositorys/in-memory/client-repository-in-memory";
import "reflect-metadata";
import { CreateCategoriesDTO } from "./CreateCategoriesService";
import { CreateCategoriesService } from "./CreateCategoriesService";
import { AppError } from "../../../middlewares/appErros";

let createCategoryService: CreateCategoriesService;

let clientRepositoryInMemory: ClientRepositoryInMemory;
let categoriesRepositoryInMemory: CategoryRepositoryInMemory;

describe("Crate A new Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoryRepositoryInMemory();
    clientRepositoryInMemory = new ClientRepositoryInMemory();

    createCategoryService = new CreateCategoriesService(
      categoriesRepositoryInMemory,
      clientRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category: CreateCategoriesDTO = {
      client_id: 1,
      name: "Footbool",
      description: "Uma descricao de uma categoria que fala sovre footebol",
      slug: "footebook-slug-test",
    };

    await createCategoryService.execute({
      client_id: category.client_id,
      description: category.description,
      name: category.name,
      slug: category.slug,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findUniqueByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should be not allow to create a new categories with same slug or Name", async () => {
    expect(async () => {
      const category: CreateCategoriesDTO = {
        client_id: 1,
        name: "Footbool",
        description: "Uma descricao de uma categoria que fala sobre footebol",
        slug: "footebook-slug-test",
      };

      await createCategoryService.execute({
        client_id: category.client_id,
        description: category.description,
        name: category.name,
        slug: category.slug,
      });

      await createCategoryService.execute({
        client_id: category.client_id,
        description: category.description,
        name: category.name,
        slug: category.slug,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
