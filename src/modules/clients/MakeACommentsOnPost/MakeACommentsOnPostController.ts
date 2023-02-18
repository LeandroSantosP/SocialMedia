import { verify } from "crypto";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { MakeACommentsOnPostService } from "./MakeACommentsOnPostService";

export class MakeACommentOnPostController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { comment, postId } = req.body;
    const { id } = req.client;

    const repository = container.resolve(MakeACommentsOnPostService);

    if (id)
      await repository.execute({
        comment,
        postId,
        client_id: id,
      });

    return res.status(201).json({
      message: "Created",
    });
  }
}
