export interface ClientRepositoryContractProps {
  name: string;
  bio: string | null;
  email: string;
  password: string;
}

export abstract class ClientRepositoryContract {
  abstract create({
    bio,
    email,
    name,
    password,
  }: ClientRepositoryContractProps): Promise<string>;
}
