import { Request, Response } from "express";
import { CategoriesRepository } from "../../../shared/Repositorys/CategoriesRepository/implementations/CategoriesRepository";
import { CreateCategoriesService } from "./CreateCategoriesService";

export class CreateCategoriesController {
  async handle(req: Request, res: Response) {
    const { name, description, slug } = req.body;

    const repository = new CategoriesRepository();
    const service = new CreateCategoriesService(repository);

    const result = await service.execute({ description, name, slug });

    return res.status(201).json(result);
  }
}
