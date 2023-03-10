import { inject, injectable } from "tsyringe";
import { AppError } from "../../shared/infra/http/middlewares/appErros";
import { ClientRepositoryContract } from "../infra/repositories/client-repository-contract";
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

    /* Ignore */

    if (user) {
      const userArr = Object.entries(user);
      let newEmail;
      for (let [key, value] of userArr) {
        if (key !== "email") {
          continue;
        }

        newEmail = { key: value };
      }
    }

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
        expiresIn: "1D",
      }
    );

    return {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    };
  }
}

export { AuthenticationClientService };
