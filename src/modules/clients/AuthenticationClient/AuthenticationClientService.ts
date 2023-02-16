import { inject, injectable } from "tsyringe";
import { AppError } from "../../../middlewares/appErros";
import { ClientRepositoryContract } from "../../shared/Repositorys/ClientRepository/client-repository-contract";
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

@injectable()
class AuthenticationClientService {
  constructor(
    @inject("ClientRepository")
    private ClientRepository: ClientRepositoryContract
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.ClientRepository.GetClientByEmail(email);

    if (!user) {
      throw new AppError("Email or Password Incorrect!!", 401);
    }
    //Senha esta correta

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or Password Incorrect!!", 401);
    }
    //Gerar um jsonwebtoken

    const token = sign(
      { userId: user.id },
      "45d57e51c68ecd47a60a180d847d12fc",
      {
        expiresIn: "1d",
      }
    );

    return {
      token,
      user: {
        name: user.name,
        email: user.name,
      },
    };
  }
}

export { AuthenticationClientService };
