import { CategoryOnPostContract } from "../categoryonpost-repository-contract";
import { prisma } from "../../../../prisma/client";
import { CategoryOnPost } from "../../prisma/CategoryOnPost";
import { CategoryDTO } from "../../../../shared/dtos/CategoryDTO";
import { PostDTO } from "../../../../shared/dtos/PostDTO";
import { CategoriesOnPosts } from "@prisma/client";

export class CategoryOnPostRepository implements CategoryOnPostContract {
  async GetPostOrCategoryExists(
    category_id: string,
    post_id: string
  ): Promise<CategoriesOnPosts | null> {
    const allPostOfOneCategory = await prisma.categoriesOnPosts.findUnique({
      where: {
        postId_categoryId: {
          categoryId: category_id,
          postId: post_id,
        },
      },
    });

    return allPostOfOneCategory;
  }
  async CategoryExist(categoryId: string): Promise<CategoryDTO | null> {
    const categoryExists = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!categoryExists) {
      return null;
    }

    return categoryExists;
  }
  async PostExist(postId: string): Promise<PostDTO | null> {
    const postExists = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!postExists) {
      return null;
    }

    return postExists;
  }

  async create(categoryId: string, postId: string): Promise<void> {
    const result = CategoryOnPost.create({
      categoryId,
      postId,
    });

    await prisma.categoriesOnPosts.create({
      data: {
        categoryId: result.props.categoryId,
        postId: result.props.postId,
      },
    });
  }
}
