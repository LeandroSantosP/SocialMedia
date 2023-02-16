import { Request, Response } from "express";
import { PostRepository } from "../../shared/Repositorys/PostRepository/implementations/PostRepository";
import { CreatePostService } from "./CreatePostService";

export class CreatePostController {
  async handle(req: Request, res: Response) {
    const { title, visible, authorId, content } = req.body;

    const repository = new PostRepository();
    const service = new CreatePostService(repository);
    const result = await service.execute({ title, visible, authorId, content });

    return res.status(201).json(result);
  }
}
