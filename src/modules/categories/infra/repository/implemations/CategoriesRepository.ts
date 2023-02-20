import { Category } from "@prisma/client";
import { CategoryDTO } from "modules/shared/dtos/CategoryDTO";
import { prisma } from "../../../../prisma/client";
import { Category as newCategories } from "../../prisma/Category";
import { CAtegoryAndPostResponse } from "../../types";
import { ICategoriesContract } from "../categories-repository-contract";

export class CategoriesRepository implements ICategoriesContract {
  private prisma;

  constructor() {
    this.prisma = prisma;
  }
  async DeleteCategory(category_id: string): Promise<CategoryDTO> {
    const CategoryForDelete = await this.prisma.category.delete({
      where: {
        id: category_id,
      },
    });

    return CategoryForDelete;
  }

  async listAllCategoriesAndPosts(): Promise<CAtegoryAndPostResponse[]> {
    const categoryWithPost = await this.prisma.category.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        CategoriesOnPosts: {
          select: {
            post: {
              select: {
                title: true,
                visible: true,
                authorId: true,
                content: true,
              },
            },
          },
        },
      },
    });

    return categoryWithPost;
  }

  async findUniqueByName(name: string): Promise<Category | null> {
    const newName = await this.prisma.category.findUnique({
      where: {
        name,
      },
    });

    return newName;
  }

  async findUnique(slug: string): Promise<Category | null> {
    const newSlug = newCategories.findUnique(slug);

    const category = await this.prisma.category.findUnique({
      where: {
        slug: newSlug,
      },
    });

    return category;
  }

  async list(): Promise<Category[]> {
    const allCategories = await this.prisma.category.findMany();

    return allCategories;
  }

  async create({ name, slug, description }: Category): Promise<void> {
    const category = newCategories.create({
      description,
      name,
      slug,
    });
    await this.prisma.category.create({
      data: {
        name: category.props.name,
        description: category.props.description,
        slug: category.props.slug,
      },
    });

    return;
  }
}
