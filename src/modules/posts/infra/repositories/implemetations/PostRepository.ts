import { prisma } from "../../../../prisma/client";
import { IPostContract, UpdatePostProps } from "../create-post-contract";
import { Post as PostEntity } from "../../prisma/Post";
import { CreatePostProps } from "../../prisma/Post";
import { PostDTO } from "../../../../shared/dtos/PostDTO";
import { Post } from "@prisma/client";

export class PostRepository implements IPostContract {
  private prisma;

  constructor() {
    this.prisma = prisma;
  }
  async GetAllPostForSearch(
    search: string,
    take: number,
    skip: number
  ): Promise<Post[]> {
    const PostForSearch = await this.prisma.post.findMany({
      where: {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      take,
      skip,
      select: {
        title: true,
        comments: true,
        authorId: true,
        review: true,
        created_at: true,
        IsPublished: true,
        author: {
          select: {
            avatar_url: true,
            name: true,
            IsAdmin: true,
          },
        },
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
      },
    });
    console.log(PostForSearch);

    return PostForSearch as any;
  }

  async getAllPost(): Promise<Post[]> {
    const allPosts = await this.prisma.post.findMany({
      include: {
        author: {
          select: {
            name: true,
            id: true,
            IsAdmin: true,
            avatar_url: true,
          },
        },
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
        comments: true,
        review: true,
      },
    });
    return allPosts;
  }

  async UpdatePost({
    IsPublished,
    content,
    post_id,
    title,
  }: UpdatePostProps): Promise<PostDTO> {
    const postUpdated = await this.prisma.post.update({
      where: {
        id: post_id,
      },
      data: {
        content,
        IsPublished,
        title,
      },
    });

    return postUpdated;
  }

  async delete(id: string): Promise<void> {
    let test = await this.prisma.post.delete({
      where: {
        id,
      },
    });

    return;
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
    const newPost = PostEntity.create({
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
