import { NextFunction, Request, Response } from "express";
import { AppError } from "./appErros";
import { ClientRepository } from "../../../../clients/infra/repositories/implemetaions/ClientRepository";
export async function adminEnsureAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.client;

  console.log(id);

  const AllClientRepository = new ClientRepository();

  if (id) {
    const getClient = await AllClientRepository.GetClientById(id);

    if (getClient?.IsAdmin === false) {
      throw new AppError("Not Authorization");
    }

    next();
  }

  return new AppError("Not Authorization");
}
