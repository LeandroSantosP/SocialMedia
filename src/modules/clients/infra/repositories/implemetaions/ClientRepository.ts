import { prisma } from "../../../../prisma/client";
import {
  ClientRepositoryContract,
  ClientRepositoryContractProps,
  GetAllPostsProps,
  GetUniquePostOfClientProps,
} from "../client-repository-contract";
import {
  IntClientCreate,
  IntClientGetAllPosts,
  IntGetPostOfClient,
} from "../../prisma/Client";
import { ClientDTO } from "../../../../shared/dtos/ClientDTO";

export class ClientRepository implements ClientRepositoryContract {
  private prisma;
  constructor() {
    this.prisma = prisma;
  }

  async updatedClientAvatar(
    avatarRef: string | null,
    userId: number
  ): Promise<void> {
    await this.prisma.client.update({
      where: {
        id: userId,
      },
      data: {
        avatar_url: avatarRef,
      },
    });

    return;
  }

  async GetClientById(id: number): Promise<ClientDTO | null> {
    const client = await this.prisma.client.findFirst({
      where: {
        id,
      },
    });

    return client;
  }
  async GetClientByEmail(email: string): Promise<ClientDTO | null> {
    const user = await this.prisma.client.findFirst({
      where: {
        email,
      },
    });

    return user;
  }
  async GetUniquePostOfClient({
    id,
    postId,
  }: GetUniquePostOfClientProps): Promise<{
    name: string;
    bio: string | null;
    avatar_url: string | null;
    posts: {
      title: string;
      IsPublished: boolean;
      content: string | null;
      visible: boolean;
      created_at: Date;
      comments: {
        id: string;
        created_at: Date;
        authorName: string;
        comment: string;
        authorId: number;
      }[];
    }[];
    id: number;
  } | null> {
    const UniquePostClientsEntities = await IntGetPostOfClient.execute({
      id,
      postId,
    });

    const UniquePostClientEntities = await this.prisma.client.findUnique({
      where: {
        id: UniquePostClientsEntities.props.id,
      },
      select: {
        name: true,
        bio: true,
        id: true,
        avatar_url: true,
        posts: {
          where: {
            id: UniquePostClientsEntities.props.postId.toString(),
          },
          select: {
            title: true,
            IsPublished: true,
            content: true,
            visible: true,
            created_at: true,
            authorId: true,
            comments: {
              select: {
                id: true,
                authorName: true,
                comment: true,
                authorId: true,
                created_at: true,
              },
            },
          },
        },
      },
    });

    return UniquePostClientEntities;
  }

  async GetAllPostsOfClient({ id }: GetAllPostsProps): Promise<
    {
      id: string;
      title: string;
      content: string | null;
      created_at: Date;
      authorId: number;
      comments: {
        id: string;
        created_at: Date;
        authorName: string;
        comment: string;
        authorId: number;
      }[];
      IsPublished: boolean;
      IsActive: boolean;
      updated_At: Date;
    }[]
  > {
    const allPostOfClientEntities = await IntClientGetAllPosts.execute({
      id,
    });

    const allPostOfClient = await this.prisma.post.findMany({
      where: {
        authorId: {
          equals: allPostOfClientEntities.props.id,
        },
      },
      select: {
        id: true,
        title: true,
        content: true,
        IsPublished: true,
        IsActive: true,
        created_at: true,
        authorId: true,
        updated_At: true,
        comments: {
          orderBy: {
            created_at: "desc",
          },
          select: {
            id: true,
            authorName: true,
            comment: true,
            authorId: true,
            created_at: true,
          },
        },
      },
    });

    return allPostOfClient;
  }
  async getAllAccounts(): Promise<ClientDTO[]> {
    const allClient = await this.prisma.client.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        IsAdmin: true,
        bio: true,
        avatar_url: true,
        createdAt: true,
        updatedAt: true,
        Comments: true,
        posts: true,
        review: true,
      },
    });

    return allClient;
  }

  async create({
    bio,
    email,
    name,
    password,
    avatar_url,
  }: ClientRepositoryContractProps): Promise<void> {
    const newClientEntities = IntClientCreate.create({
      bio,
      email,
      name,
      password,
      avatar_url,
    });

    await this.prisma.client.create({
      data: {
        bio: newClientEntities.props.bio,
        email: newClientEntities.props.email,
        name: newClientEntities.props.name,
        password: newClientEntities.props.password,
        avatar_url: newClientEntities.props.avatar_url,
      },
    });

    return;
  }
}
