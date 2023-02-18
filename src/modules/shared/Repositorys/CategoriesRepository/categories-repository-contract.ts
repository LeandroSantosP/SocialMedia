import { Category } from "@prisma/client";
import { CategoryDTO } from "../../dtos/CategoryDTO";

export abstract class ICategoriesContract {
  abstract create(dados: CategoryDTO): Promise<void>;
  abstract list(): Promise<CategoryDTO[]>;

  abstract listAllCategoriesAndPosts(): Promise<
    (CategoryDTO & {
      CategoriesOnPosts: {
        post: {
          title: string;
          visible: boolean;
          authorId: number;
          content: string | null;
        };
      }[];
    })[]
  >;

  abstract findUnique(slug: string): Promise<CategoryDTO | null>;
  abstract findUniqueByName(name: string): Promise<CategoryDTO | null>;
}
