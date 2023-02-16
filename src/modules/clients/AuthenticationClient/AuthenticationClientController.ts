import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticationClientService } from "./AuthenticationClientService";

export class AuthenticationClientController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const service = container.resolve(AuthenticationClientService);
    const result = await service.execute({ email, password });

    res.status(201).json(result);
  }
}
