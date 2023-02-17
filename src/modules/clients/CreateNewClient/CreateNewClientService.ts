import {
  ClientRepositoryContract,
  ClientRepositoryContractProps,
} from "../../shared/Repositorys/ClientRepository/client-repository-contract";
import bcrypt from "bcrypt";
import * as yup from "yup";
import { AppError } from "../../../middlewares/appErros";

export type IErrorClient = {
  [id: string]: string;
};

let emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;

const schemaOfNewClient = yup.object().shape({
  email: yup
    .string()
    .required("Field Email is required!")
    .matches(emailRegex, "Email Format Invalid!"),
  name: yup.string().required("Field Name is required!"),
  password: yup
    .string()
    .required("Password is required!")
    .min(3, "min 3 length"),
});

export class CreateNewClientService {
  private schemaOfNewClient;

  constructor(private createClientRepository: ClientRepositoryContract) {
    this.schemaOfNewClient = schemaOfNewClient;
  }

  async execute({
    email,
    name,
    password,
    bio,
    avatar_url,
  }: ClientRepositoryContractProps) {
    const allClients = await this.createClientRepository.getAllAccounts();

    const ClientAlreadyExists = allClients.some(
      (client) => client.email === email
    );

    if (ClientAlreadyExists) {
      throw new AppError("Email already Exists!");
    }

    const result = await this.schemaOfNewClient
      .validate({ email, name, password }, { abortEarly: false })
      .then(async (validateData) => {
        const hashPassword = await bcrypt.hash(validateData.password, 9);

        const result = await this.createClientRepository.create({
          bio,
          email: validateData.email,
          name: validateData.name,
          password: hashPassword,
          avatar_url,
        });

        const { password: _, ...ClientInfos } = result;

        return ClientInfos;
      })
      .catch((err: yup.ValidationError) => {
        let ErrorMessage: IErrorClient = {};

        if (err.inner)
          err.inner.forEach((err) => {
            if (!err.path) return;
            ErrorMessage["message"] = err.message;
          });

        return ErrorMessage;
      });

    return result;
  }
}
