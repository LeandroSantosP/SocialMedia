import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCategoryService } from "./DeleteCategoryService";

export class DeleteCategoryController {
  async handle(req: Request, res: Response) {
    const { category_id } = req.body;

    const service = container.resolve(DeleteCategoryService);

    const result = await service.execute(category_id);

    return res.status(202).json(result);
  }
}
