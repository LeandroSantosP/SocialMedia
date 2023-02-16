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
} from "../../../entities/Client";
import { ClientDTO } from "../../../dtos/ClientDTO";
import { PostDTO } from "../../../dtos/PostDTO";
import { CommentDTO } from "../../../dtos/CommentsDTO";
import { triggerAsyncId } from "async_hooks";

export class ClientRepository implements ClientRepositoryContract {
  async GetClientById(id: number): Promise<ClientDTO | null> {
    const client = await prisma.client.findFirst({
      where: {
        id,
      },
    });

    return client;
  }
  async GetClientByEmail(email: string): Promise<ClientDTO | null> {
    const user = await prisma.client.findFirst({
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
    id: number;
    name: string;
    bio: string | null;
    posts: {
      title: string;
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
  } | null> {
    const UniquePostClientsEntities = await IntGetPostOfClient.execute({
      id,
      postId,
    });

    const UniquePostClientEntities = await prisma.client.findUnique({
      where: {
        id: UniquePostClientsEntities.props.id,
      },
      select: {
        name: true,
        bio: true,
        id: true,
        posts: {
          where: {
            id: UniquePostClientsEntities.props.postId.toString(),
          },
          select: {
            title: true,
            content: true,
            visible: true,
            created_at: true,
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

    const allPostOfClient = await prisma.post.findMany({
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
        updated_At: true,
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
    });

    return allPostOfClient;
  }
  async getAllAccounts(): Promise<ClientDTO[]> {
    const allClient = await prisma.client.findMany();

    return allClient;
  }

  async create({
    bio,
    email,
    name,
    password,
  }: ClientRepositoryContractProps): Promise<ClientDTO> {
    const newClientEntities = IntClientCreate.create({
      bio,
      email,
      name,
      password,
    });

    const newClient = await prisma.client.create({
      data: {
        bio: newClientEntities.props.bio,
        email: newClientEntities.props.email,
        name: newClientEntities.props.name,
        password: newClientEntities.props.password,
      },
    });

    return newClient;
  }
}
