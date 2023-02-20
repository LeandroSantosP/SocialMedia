import { Request, Response } from "express";
import { container } from "tsyringe";
import { SearchPostService } from "./SearchPostService";

export class SearchPostController {
  async handle(req: Request, res: Response) {
    const { search, skip, take } = req.query;

    const repository = container.resolve(SearchPostService);
    const result = await repository.execute({
      search: String(search),
      take: Number(take) || 15,
      skip: Number(skip) || 4,
    });

    return res.json(result);
  }
}
