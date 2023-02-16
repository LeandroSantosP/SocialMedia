import { prisma } from "../../../../prisma/client";
import { IPostContract } from "../create-post-contract";
import { Post } from "../../../entities/Post";
import { CreatePostProps } from "../../../entities/Post";
import { PostDTO } from "../../../dtos/PostDTO";

export class PostRepository implements IPostContract {
  private prisma;

  constructor() {
    this.prisma = prisma;
  }

  async getAllPost(): Promise<
    {
      title: string;
      visible: boolean;
      content: string | null;
      created_at: Date;
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
        title: true,
        visible: true,
        created_at: true,
        content: true,
        CategoriesOnPosts: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        author: {
          select: {
            name: true,
            id: true,
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
