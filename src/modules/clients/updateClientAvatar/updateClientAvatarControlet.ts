import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateClientAvatarService } from "./updateClientAvatarService";

export class UpdateClientAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.client;

    const avatar_file = req.file?.filename;

    const updatedClientAvatarService = container.resolve(
      UpdateClientAvatarService
    );

    await updatedClientAvatarService.execute({
      user_id: Number(id),
      avatar_file: avatar_file ?? "",
    });

    return res.status(204).send();
  }
}
