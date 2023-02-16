import { verify } from "crypto";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { MakeACommentsOnPostService } from "./MakeACommentsOnPostService";

export class MakeACommentOnPostController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { authorId, authorName, comment, postId } = req.body;

    console.log(authorId);

    const repository = container.resolve(MakeACommentsOnPostService);

    await repository.execute({
      authorId,
      authorName,
      comment,
      postId,
    });

    return res.status(201).json({
      message: "Created",
    });
  }
}
