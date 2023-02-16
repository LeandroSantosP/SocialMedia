import { Router } from "express";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { CrateNewClientController } from "../modules/clients/CreateNewClient/CreateNewClientController";
import { GetAllPostOfClientController } from "../modules/clients/GetAllPostOfClient/GetAllPostOfClientController";
import { GetUniquePostOfClientController } from "../modules/clients/GetUniquePostOfClient/GetUniquePostOfClientController";
import { MakeACommentOnPostController } from "../modules/clients/MakeACommentsOnPost/MakeACommentsOnPostController";

const crateNewClientController = new CrateNewClientController();
const getAllPostOfClientController = new GetAllPostOfClientController();
const getUniquePostOfClientController = new GetUniquePostOfClientController();
const makeACommentOnPostController = new MakeACommentOnPostController();

const clientRoute = Router();

clientRoute.post("/", crateNewClientController.handle);
clientRoute.use(ensureAuthentication);
clientRoute.post("/comment", makeACommentOnPostController.handle);
clientRoute.get("/posts/:id", getAllPostOfClientController.handle);
clientRoute.get(
  "/:clientId/posts/:postId",
  getUniquePostOfClientController.handle
);

export { clientRoute };
