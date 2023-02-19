import { Request, Response } from "express";
import { ClientRepository } from "../infra/repositories/implemetaions/ClientRepository";
import { GetUniquePostOfClientService } from "./GetUniquePostOfClientService";

export class GetUniquePostOfClientController {
  async handle(req: Request, res: Response) {
    const { clientId, postId } = req.params;
    const repository = new ClientRepository();

    const service = new GetUniquePostOfClientService(repository);

    const result = await service.execute({
      id: Number(clientId),
      postId: postId,
    });

    return res.json(result);
  }
}
