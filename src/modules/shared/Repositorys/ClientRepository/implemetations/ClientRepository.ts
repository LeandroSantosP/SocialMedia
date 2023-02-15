import { prisma } from "../../../../prisma/client";
import {
  ClientRepositoryContract,
  ClientRepositoryContractProps,
  GetAllPostsProps,
} from "../client-repository-contract";
import {
  IntClientCreate,
  IntClientGetAllPosts,
} from "../../../entities/Client";
import { ClientDTO } from "../../../dtos/ClientDTO";
import { PostDTO } from "../../../dtos/PostDTO";

export class ClientRepository implements ClientRepositoryContract {
  async GetAllPostsOfClient({
    email,
    password,
  }: GetAllPostsProps): Promise<PostDTO[]> {
    const allPostOfClientEntities = IntClientGetAllPosts.getAllPosts({
      email,
      password,
    });

    const allPostOfClient = await prisma.client.findMany({
      where: {
        password: allPostOfClientEntities.props.email,
        email: allPostOfClientEntities.props.email,
      },
      select: {
        posts: true,
      },
    });

    // for (let post of allPostOfClient) {
    //   console.log(post.posts);
    // }

    const FormatDataClient = allPostOfClient.map((client) => client.posts[0]);

    return FormatDataClient;
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
