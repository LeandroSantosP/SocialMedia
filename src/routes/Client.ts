import { Router } from "express";
import { CrateNewClientController } from "../modules/clients/service/CreateNewClient/CreateNewClientController";
import { GetAllPostOfClientController } from "../modules/clients/service/GetAllPostOfClient/GetAllPostOfClientController";
import { GetUniquePostOfClientController } from "../modules/clients/service/GetUniquePostOfClient/GetUniquePostOfClientController";

const crateNewClientController = new CrateNewClientController();
const getAllPostOfClientController = new GetAllPostOfClientController();
const getUniquePostOfClientController = new GetUniquePostOfClientController();

const clientRoute = Router();

clientRoute.post("/", crateNewClientController.handle);
clientRoute.get("/posts/:id", getAllPostOfClientController.handle);
clientRoute.get(
  "/:clientId/posts/:postId",
  getUniquePostOfClientController.handle
);

export { clientRoute };
