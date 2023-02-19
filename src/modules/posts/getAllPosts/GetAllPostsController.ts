import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetAllPostService } from "./GetAllPostService";

export class GetAllPostController {
  async handle(req: Request, res: Response) {
    const repository = container.resolve(GetAllPostService);

    const result = await repository.execute();

    res.status(200).json(result);
  }
}
