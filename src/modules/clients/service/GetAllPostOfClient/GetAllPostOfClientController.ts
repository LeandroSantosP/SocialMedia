import { Request, Response } from "express";
import { ClientRepository } from "../../../shared/Repositorys/ClientRepository/implemetations/ClientRepository";
import { GetAllPostOfClientService } from "./GetAllPostOfClientService";

export class GetAllPostOfClientController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const repository = new ClientRepository();
    const service = new GetAllPostOfClientService(repository);
    const result = await service.execute({ id: Number(id) });

    return res.json(result);
  }
}
