import { Category } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { Category as newCategories } from "../../../entities/Category";
import { CreateNewCategoryDTO, ICategoriesDTO } from "../CategoriesDTO";

export class CategoriesRepository implements ICategoriesDTO {
  private prisma;

  constructor() {
    this.prisma = prisma;
  }

  async listAllCategoriesAndPosts(): Promise<
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
  > {
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
    const allCategories = await this.prisma.category.findMany({});

    return allCategories;
  }

  async create({
    name,
    slug,
    description,
  }: CreateNewCategoryDTO): Promise<Category> {
    const category = newCategories.create({
      description,
      name,
      slug,
    });

    const newCategory = await this.prisma.category.create({
      data: {
        name: category.props.name,
        description: category.props.description,
        slug: category.props.slug,
      },
    });

    return newCategory;
  }
}
