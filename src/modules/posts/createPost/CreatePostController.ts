import { Request, Response } from "express";
import { PostRepository } from "../infra/repositories/implemetations/PostRepository";
import { CreatePostService } from "./CreatePostService";

export class CreatePostController {
  async handle(req: Request, res: Response) {
    const { title, visible, content } = req.body;
    const { id } = req.client;

    const repository = new PostRepository();
    const service = new CreatePostService(repository);
    const result = await service.execute({
      title,
      visible,
      authorId: id,
      content,
    });

    return res.status(201).json(result);
  }
}
