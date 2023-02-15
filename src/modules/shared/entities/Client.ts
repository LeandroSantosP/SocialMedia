import { AppError } from "../../../errors/appErros";
import { prisma } from "../../prisma/client";
import { Entity } from "../core/Entity";
import { GetUniquePostOfClientProps } from "../Repositorys/ClientRepository/client-repository-contract";
import {
  ClientRepositoryContractProps,
  GetAllPostsProps,
} from "../Repositorys/ClientRepository/client-repository-contract";

export class IntClientCreate extends Entity<ClientRepositoryContractProps> {
  private constructor(props: ClientRepositoryContractProps) {
    super(props);
  }

  static create(props: ClientRepositoryContractProps) {
    const category = new IntClientCreate(props);
    return category;
  }
}

async function ClientExits(id: number): Promise<null | number> {
  const ClientExits = await prisma.client.findMany({
    select: {
      id: true,
    },
  });

  let userID: number | null = null;

  ClientExits.forEach((clientId) => {
    if (clientId.id === id) {
      userID = id;
      return;
    }
  });

  return userID;
}

export class IntClientGetAllPosts extends Entity<GetAllPostsProps> {
  private constructor(props: GetAllPostsProps) {
    super(props);
  }

  static async execute(props: GetAllPostsProps) {
    const clientExits = await ClientExits(props.id);

    if (clientExits === null) {
      throw new AppError("Client Id Invalid");
    }

    const category = new IntClientGetAllPosts(props);
    return category;
  }
}

export class IntGetPostOfClient extends Entity<GetUniquePostOfClientProps> {
  constructor(props: GetUniquePostOfClientProps) {
    super(props);
  }

  static async execute(props: GetUniquePostOfClientProps) {
    const clientExits = await ClientExits(props.id);

    if (clientExits === null) {
      throw new AppError("Client Id Invalid");
    }

    const Posts = new IntGetPostOfClient(props);

    return Posts;
  }
}
