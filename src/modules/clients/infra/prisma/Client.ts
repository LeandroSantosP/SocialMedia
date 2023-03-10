import { AppError } from "../../../shared/infra/http/middlewares/appErros";
import { prisma } from "../../../prisma/client";
import { Entity } from "../../../shared/core/Entity";
import { GetUniquePostOfClientProps } from "../repositories/client-repository-contract";
import { ClientDTO } from "../../../shared/dtos/ClientDTO";
import { GetAllPostsProps } from "../repositories/client-repository-contract";

export class IntClientCreate extends Entity<ClientDTO> {
  private constructor(props: ClientDTO) {
    super(props);
  }

  static create(props: ClientDTO) {
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

  if (userID === null) {
    throw new AppError("Client Id does not exits!");
  }

  return userID;
}

export class IntClientGetAllPosts extends Entity<GetAllPostsProps> {
  private constructor(props: GetAllPostsProps) {
    super(props);
  }

  static async execute(props: GetAllPostsProps) {
    await ClientExits(props.id);

    const category = new IntClientGetAllPosts(props);
    return category;
  }
}

export class IntGetPostOfClient extends Entity<GetUniquePostOfClientProps> {
  constructor(props: GetUniquePostOfClientProps) {
    super(props);
  }

  static async execute(props: GetUniquePostOfClientProps) {
    await ClientExits(props.id);

    const Posts = new IntGetPostOfClient(props);

    return Posts;
  }
}
