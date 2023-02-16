import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryOnPostService } from "./CreateCategoryOnPostService";

export class CreateCategoryOnPostController {
  async handle(req: Request, res: Response) {
    const { categoryId, postId } = req.body;

    const service = container.resolve(CreateCategoryOnPostService);

    const result = await service.execute({ categoryId, postId });

    return res.status(201).json(result);
  }
}
