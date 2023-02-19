import { Request, Response } from "express";
import { ADMGetAllClientsInfosService } from "./GetAllClientsInfosService";
import { container } from "tsyringe";

export class ADMGetAllClientsController {
  async handle(req: Request, res: Response) {
    const { id } = req.client;

    console.log(id);

    const repository = container.resolve(ADMGetAllClientsInfosService);
    const resolve = await repository.execute({ client_admin_id: Number(id) });

    return res.status(200).json(resolve);
  }
}
