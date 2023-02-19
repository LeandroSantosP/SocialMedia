import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdatePostService } from "./UpdatedPostService";

export class UpdatedPostController {
  async handle(req: Request, res: Response) {
    const { post_id } = req.params;
    const { content, IsPublished, title } = req.body;

    const { id } = req.client;

    const repository = container.resolve(UpdatePostService);

    const result = await repository.execute({
      content,
      IsPublished,
      post_id,
      title,
      client_id: Number(id),
    });

    return res.status(201).json(result);
  }
}
