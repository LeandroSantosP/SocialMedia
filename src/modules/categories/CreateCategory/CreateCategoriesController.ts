import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoriesService } from "./CreateCategoriesService";

export class CreateCategoriesController {
  async handle(req: Request, res: Response) {
    const { name, description, slug } = req.body;

    const service = container.resolve(CreateCategoriesService);

    const result = await service.execute({ description, name, slug });

    return res.status(201).json(result);
  }
}