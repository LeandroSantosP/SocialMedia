import { prisma } from "../../../../prisma/client";
import { IPostContract } from "../create-post-contract";
import { Post } from "../../prisma/Post";
import { CreatePostProps } from "../../prisma/Post";
import { PostDTO } from "../../../../shared/dtos/PostDTO";
import { Review } from "@prisma/client";

export class PostRepository implements IPostContract {
  private prisma;

  constructor() {
    this.prisma = prisma;
  }
  async delete(id: string): Promise<void> {
    const postDeleted = await this.prisma.post.delete({
      where: {
        id,
      },
    });

    return;
  }

  async getAllPost(): Promise<
    {
      id: string;
      title: string;
      visible: boolean;
      content: string | null;
      created_at: Date;
      review: Review[];
      CategoriesOnPosts: {
        category: {
          name: string;
        };
      }[];
      author: {
        id: number;
        name: string;
      };
    }[]
  > {
    const allPosts = await this.prisma.post.findMany({
      select: {
        id: true,
        title: true,
        visible: true,
        created_at: true,
        content: true,
        comments: true,
        review: true,
        CategoriesOnPosts: {
          select: {
            category: {
              select: {
                name: true,
                slug: true,
              },
            },
          },
        },
        author: {
          select: {
            name: true,
            id: true,
            IsAdmin: true,
          },
        },
      },
    });

    return allPosts;
  }

  async findBySlug(title: string): Promise<PostDTO | null> {
    const post = await this.prisma.post.findUnique({
      where: {
        title,
      },
    });
    return post;
  }

  async create({ title, visible, authorId, content }: CreatePostProps) {
    const newPost = Post.create({
      title,
      visible,
      authorId,
      content,
    });

    const result = await this.prisma.post.create({
      data: {
        title: newPost.props.title,
        visible: newPost.props.visible,
        authorId: newPost.props.authorId,
        content: newPost.props.content,
      },
    });

    return result;
  }
}
