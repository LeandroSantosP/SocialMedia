import { Request, Response } from "express";
import { ClientRepository } from "../../../shared/Repositorys/ClientRepository/implemetations/ClientRepository";
import { GetAllPostOfClientService } from "./GetAllPostOfClientService";

export class GetAllPostOfClientController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const repository = new ClientRepository();
    const service = new GetAllPostOfClientService(repository);
    const result = await service.execute({ email, password });

    return res.json(result);
  }
}
