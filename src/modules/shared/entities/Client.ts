import { Entity } from "../core/Entity";
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

export class IntClientGetAllPosts extends Entity<GetAllPostsProps> {
  private constructor(props: GetAllPostsProps) {
    super(props);
  }

  static getAllPosts(props: GetAllPostsProps) {
    const category = new IntClientGetAllPosts(props);
    return category;
  }
}
