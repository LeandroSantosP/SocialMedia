import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePostService } from "./DeletePostService";

export class DeletePostController {
  async handle(req: Request, res: Response) {
    const { postId } = req.params;
    const { id } = req.client;

    const repository = container.resolve(DeletePostService);

    await repository.execute({ authorId: Number(id), postId });

    res.status(202).send();
  }
}
