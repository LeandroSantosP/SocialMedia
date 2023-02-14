import { Request, Response } from "express";
import { ClientRepository } from "../../../shared/Repositorys/ClientRepository/implemetations/ClientRepository";
import { ClientService } from "./CreateNewClientService";

export class CrateNewClientController {
  async handle(req: Request, res: Response) {
    console.log("ok");

    const { name, email, password, bio } = req.body;

    console.log(name, email, password, bio);

    const repository = new ClientRepository();

    const Service = new ClientService(repository);
    const result = await Service.execute({ bio, email, name, password });

    return res.status(201).json(result);
  }
}
