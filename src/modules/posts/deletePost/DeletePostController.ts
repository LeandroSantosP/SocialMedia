import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePostService } from "./DeletePostService";

export class DeletePostController {
  async handle(req: Request, res: Response) {
    const { authorId } = req.params;
    const { postId } = req.body;

    const repository = container.resolve(DeletePostService);

    await repository.execute({ authorId: Number(authorId), postId });

    res.status(202).send();
  }
}
