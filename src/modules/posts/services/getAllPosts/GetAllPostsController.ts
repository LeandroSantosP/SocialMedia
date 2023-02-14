import { Request, Response } from "express";
import { PostRepository } from "../../../shared/Repositorys/PostRepository/implementations/PostRepository";

export class GetAllPostController {
  async handle(req: Request, res: Response) {
    const repository = new PostRepository();

    const result = await repository.getAllPost();

    res.status(200).json(result);
  }
}
