import { CrateNewClientController } from "../modules/clients/service/CreateNewClient/CreateNewClientController";
import { Router } from "express";

const crateNewClientController = new CrateNewClientController();

const clientRoute = Router();

clientRoute.post("/", crateNewClientController.handle);

export { clientRoute };
