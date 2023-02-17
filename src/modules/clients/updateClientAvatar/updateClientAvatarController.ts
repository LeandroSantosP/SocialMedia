import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../middlewares/appErros";
import { UpdateClientAvatarService } from "./updateClientAvatarService";

export class UpdateClientAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.client;

    const avatar_file = req.file?.filename;

    const updatedClientAvatarService = container.resolve(
      UpdateClientAvatarService
    );

    if (!avatar_file) {
      throw new AppError("Avatar Url Is Require!");
    }

    await updatedClientAvatarService.execute({
      user_id: Number(id),
      avatar_file,
    });

    return res.status(204).send();
  }
}
