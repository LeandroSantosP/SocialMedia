import { NextFunction, Request, Response } from "express";
import { AppError } from "./appErros";
import { verify } from "jsonwebtoken";
import { ClientRepository } from "../modules/shared/Repositorys/ClientRepository/implemetations/ClientRepository";

interface IJWTPayLoad {
  userId: number;
  iat: number;
  exp: number;
}
const userRepository = new ClientRepository();
export async function ensureAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError("Token missing!", 401);
  }

  const token = authorization.split(" ")[1];

  try {
    const { userId } = verify(
      token,
      "45d57e51c68ecd47a60a180d847d12fc"
    ) as IJWTPayLoad;

    const client = await userRepository.GetClientById(userId);

    if (!client) {
      throw (new AppError("Not Authorization"), 401);
    }

    req.client = {
      id: client.id,
    };

    next();
  } catch (err) {
    throw new AppError("Invalid Token", 401);
  }
}
