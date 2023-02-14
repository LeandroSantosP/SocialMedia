import { Category } from "@prisma/client";

export interface CreateNewCategoryDTO {
  name: string;
  description?: string;
  slug: string;
}

export abstract class ICategoriesDTO {
  abstract create(dados: CreateNewCategoryDTO): Promise<Category>;
  abstract list(): Promise<Category[]>;

  abstract listAllCategoriesAndPosts(): Promise<
    (Category & {
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

  abstract findUnique(slug: string): Promise<Category | null>;
  abstract findUniqueByName(name: string): Promise<Category | null>;
}
