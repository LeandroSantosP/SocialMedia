import { Request, Response } from "express";
import { container } from "tsyringe";
import { ReviewPostService } from "./ReviewPostService";

export class ReviewPostController {
  async handle(req: Request, res: Response) {
    const { post_id } = req.body;

    const { id } = req.client;

    const repository = container.resolve(ReviewPostService);
    const result = await repository.execute({
      client_id: Number(id),
      post_id,
    });
    return res.status(201).json(result);
  }
}
