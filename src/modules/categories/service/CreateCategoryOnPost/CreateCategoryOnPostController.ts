import { Request, Response } from "express";
import { CategoryOnPostRepository } from "../../../shared/Repositorys/CreateCategoryOnPostDService.ts/implemetation/CategoryOnPostRepository";
import { CreateCategoryOnPostService } from "./CreateCategoryOnPostService";

export class CreateCategoryOnPostController {
  async handle(req: Request, res: Response) {
    const { categoryId, postId } = req.body;

    const repository = new CategoryOnPostRepository();
    const service = new CreateCategoryOnPostService(repository);

    const result = await service.execute({ categoryId, postId });

    return res.status(201).json(result);
  }
}
