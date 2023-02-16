import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetAllPostOfClientService } from "./GetAllPostOfClientService";

export class GetAllPostOfClientController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const service = container.resolve(GetAllPostOfClientService);
    const result = await service.execute({ id: Number(id) });

    return res.json(result);
  }
}
