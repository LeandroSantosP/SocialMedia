import { CategoryOnPostContract } from "../categoryonpost-repository-contract";
import { prisma } from "../../../../prisma/client";
import { CategoryOnPost } from "../../../entities/CategoryOnPost";
import { CategoryDTO } from "../../../dtos/CategoryDTO";
import { PostDTO } from "../../../dtos/PostDTO";

export class CategoryOnPostRepository implements CategoryOnPostContract {
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
