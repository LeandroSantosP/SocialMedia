import { CategoryDTO } from "../../../dtos/CategoryDTO";

import { randomUUID } from "crypto";

import { ICategoriesContract } from "../../CategoriesRepository/categories-repository-contract";

import { Category as newCategory } from "../../../entities/Category";

export class CategoryRepositoryInMemory implements ICategoriesContract {
  categories: CategoryDTO[] = [];

  async list(): Promise<CategoryDTO[]> {
    const all = this.categories;

    return all;
  }
  listAllCategoriesAndPosts(): Promise<
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
  > {
    throw new Error("Method not implemented.");
  }

  async findUniqueByName(name: string): Promise<CategoryDTO | null> {
    const category = this.categories.find((cate) => cate.name === name);

    if (!category) {
      return null;
    }

    return category;
  }
  async findUnique(slug: string): Promise<CategoryDTO | null> {
    const category = this.categories.find((cate) => cate.slug === slug);

    if (!category) {
      return null;
    }

    return category;
  }

  async create({ name, slug, description }: CategoryDTO): Promise<void> {
    const category = newCategory.create({
      description,
      name,
      slug,
      id: randomUUID(),
      created_at: new Date(),
      updated_At: new Date(),
    });

    this.categories.push(category.props);

    return;
  }
}
