import { Request, Response } from "express";
import { ClientRepository } from "../../shared/Repositorys/ClientRepository/implemetations/ClientRepository";
import { CreateNewClientService } from "./CreateNewClientService";
import { IErrorClient } from "./CreateNewClientService";

export class CrateNewClientController {
  async handle(req: Request, res: Response) {
    const { name, email, password, bio, avatar_url } = req.body;
    const repository = new ClientRepository();

    const Service = new CreateNewClientService(repository);
    const result = await Service.execute({
      bio,
      email,
      name,
      password,
      avatar_url,
    });

    if (typeof result === "object" && result.hasOwnProperty("message")) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);
  }
}
