import "reflect-metadata";
import { CategoryRepositoryInMemory } from "../../categories/infra/repository/in-memory/categories-repository-in-memory";
import { ClientRepositoryInMemory } from "../../clients/infra/repositories/in-memory/client-repository-in-memory";
import { CreateCategoriesDTO } from "./CreateCategoriesService";
import { CreateCategoriesService } from "./CreateCategoriesService";
import { AppError } from "../../shared/infra/http/middlewares/appErros";

let createCategoryService: CreateCategoriesService;

let categoriesRepositoryInMemory: CategoryRepositoryInMemory;

describe("Crate A new Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoryRepositoryInMemory();

    createCategoryService = new CreateCategoriesService(
      categoriesRepositoryInMemory
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
