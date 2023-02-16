import { Router } from "express";
import { AuthenticationClientController } from "../modules/clients/AuthenticationClient/AuthenticationClientController";
import { CrateNewClientController } from "../modules/clients/CreateNewClient/CreateNewClientController";
import { GetAllPostOfClientController } from "../modules/clients/GetAllPostOfClient/GetAllPostOfClientController";
import { GetUniquePostOfClientController } from "../modules/clients/GetUniquePostOfClient/GetUniquePostOfClientController";

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
