import { describe } from "node:test";
import { CreateCategoriesService } from "./CreateCategoriesService";
import { CategoriesRepository } from "../../shared/Repositorys/CategoriesRepository/implementations/CategoriesRepository";
import { AppError } from "../../../middlewares/appErros";

describe("Create Challenge Category Service", () => {
  it("should be able create a new category", async () => {
    const repo = new CategoriesRepository();
    const sut = new CreateCategoriesService(repo);

    const result = await sut.execute({
      description: "decricao-test",
      name: "Sapatos",
      slug: "sapatos-slug",
    });

    if (result instanceof AppError) {
    }

    expect(result).toBeTruthy();
  });
});
