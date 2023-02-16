import { Request, Response } from "express";
import { ClientRepository } from "../../shared/Repositorys/ClientRepository/implemetations/ClientRepository";
import { CreateNewClientService } from "./CreateNewClientService";

export class CrateNewClientController {
  async handle(req: Request, res: Response) {
    console.log("ok");

    const { name, email, password, bio } = req.body;
    const { id } = req.params;
    const repository = new ClientRepository();

    const Service = new CreateNewClientService(repository);
    const result = await Service.execute({ bio, email, name, password });

    return res.status(201).json(result);
  }
}
