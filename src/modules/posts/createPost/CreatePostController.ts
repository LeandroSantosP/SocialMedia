import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePostService } from "./CreatePostService";

export class CreatePostController {
  async handle(req: Request, res: Response) {
    const { title, visible, content } = req.body;
    const { id } = req.client;

    const repository = container.resolve(CreatePostService);
    const result = await repository.execute({
      title,
      visible,
      authorId: id,
      content,
    });

    return res.status(201).json(result);
  }
}
