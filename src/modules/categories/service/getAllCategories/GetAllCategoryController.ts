import { Request, Response } from "express";
import { CategoriesRepository } from "../../../shared/Repositorys/CategoriesRepository/implementations/CategoriesRepository";
import { GetAllCategoriesService } from "./GetAllCategoriesService";

export class GetAllCategoriesController {
  async handle(req: Request, res: Response) {
    const repository = new CategoriesRepository();
    const service = new GetAllCategoriesService(repository);

    const result = await service.execute();

    return res.status(201).json(result);
  }
}
