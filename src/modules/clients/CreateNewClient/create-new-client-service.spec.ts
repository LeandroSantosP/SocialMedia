import { AppError } from "../../shared/infra/http/middlewares/appErros";
import "reflect-metadata";
import { ClientRepositoryInMemory } from "../infra/repositories/in-memory/client-repository-in-memory";
import { CreateNewClientService } from "./CreateNewClientService";

let clientRepositoryInMemory: ClientRepositoryInMemory;
let createNewClient: CreateNewClientService;

describe("Create a new Client", () => {
  beforeEach(() => {
    clientRepositoryInMemory = new ClientRepositoryInMemory();

    createNewClient = new CreateNewClientService(clientRepositoryInMemory);
  });

  it("should be able to create a new client", async () => {
    const newUser = {
      email: "user@test.com",
      name: "test",
      password: "senha123123",
      bio: "uma descricao de test",
      avatar_url: null,
    };
    await createNewClient.execute(newUser);

    const clientCreated = await clientRepositoryInMemory.GetClientByEmail(
      newUser.email
    );

    expect(clientCreated).toHaveProperty("email");
  });

  it("should not to be able to create client if email already Exits!", () => {
    expect(async () => {
      const newUser = {
        email: "user@test.com",
        name: "test",
        password: "senha123123",
        bio: "uma descricao de test",
        avatar_url: null,
      };
      await createNewClient.execute(newUser);
      await createNewClient.execute(newUser);
    }).rejects.toBeInstanceOf(AppError);
  });
});
