import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetAllClientInfosService } from "./GetAllClientInfosService";

export class GetAllClientInfosController {
  async handle(req: Request, res: Response) {
    const { id } = req.client;

    const GetAllClientServices = container.resolve(GetAllClientInfosService);
    const clientInfos = await GetAllClientServices.execute({
      user_id: Number(id),
    });

    res.status(200).json(clientInfos);
  }
}
