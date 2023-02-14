import { Entity } from "../core/Entity";
import { ClientRepositoryContractProps } from "../Repositorys/ClientRepository/client-repository-contract";

export class IntClient extends Entity<ClientRepositoryContractProps> {
  private constructor(props: ClientRepositoryContractProps) {
    super(props);
  }

  static create(props: ClientRepositoryContractProps) {
    const category = new IntClient(props);
    return category;
  }
}
