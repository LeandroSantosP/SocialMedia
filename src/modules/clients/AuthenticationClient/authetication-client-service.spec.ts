import "reflect-metadata";
import { AppError } from "../../../middlewares/appErros";
import { ClientDTO } from "../../../modules/shared/dtos/ClientDTO";
import { ClientRepositoryInMemory } from "../../../modules/shared/Repositorys/ClientRepository/in-memory/client-repository-in-memory";
import { CreateNewClientService } from "../../clients/CreateNewClient/CreateNewClientService";
import { AuthenticationClientService } from "../../clients/AuthenticationClient/AuthenticationClientService";

let authenticationClientService: AuthenticationClientService;
let clientRepositoryInMemory: ClientRepositoryInMemory;
let createClientService: CreateNewClientService;

describe("Authenticate Client", () => {
  beforeEach(() => {
    clientRepositoryInMemory = new ClientRepositoryInMemory();
    authenticationClientService = new AuthenticationClientService(
      clientRepositoryInMemory
    );
    createClientService = new CreateNewClientService(clientRepositoryInMemory);
  });
  it("should be allow to create a token authentication fot client!", async () => {
    const client: ClientDTO = {
      avatar_url: "avatar-test.png",
      bio: "Uma BIO de test",
      email: "exemplo@gmail.com",
      name: "John Doe",
      password: "12345",
    };

    await createClientService.execute(client);

    const result = await authenticationClientService.execute({
      email: client.email,
      password: client.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not to be able do authenticate if client does not exists!", () => {
    expect(async () => {
      await authenticationClientService.execute({
        email: "falseEmail@gmai.com",
        password: "sadjnbsklj",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not to be able to authentication client if password is incorrectly", () => {
    expect(async () => {
      const client: ClientDTO = {
        avatar_url: "avatar-test.png",
        bio: "Uma BIO de test",
        email: "exemplo@gmail.com",
        name: "John Doe",
        password: "12345",
      };

      await createClientService.execute(client);

      await authenticationClientService.execute({
        email: client.email,
        password: "1234s5",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
