import multer from "multer";
import { Router } from "express";
import uploadConfig from "../config/upload";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { CrateNewClientController } from "../modules/clients/CreateNewClient/CreateNewClientController";
import { GetAllPostOfClientController } from "../modules/clients/GetAllPostOfClient/GetAllPostOfClientController";
import { GetUniquePostOfClientController } from "../modules/clients/GetUniquePostOfClient/GetUniquePostOfClientController";
import { MakeACommentOnPostController } from "../modules/clients/MakeACommentsOnPost/MakeACommentsOnPostController";
import { UpdateClientAvatarController } from "../modules/clients/updateClientAvatar/updateClientAvatarControlet";

const crateNewClientController = new CrateNewClientController();
const getAllPostOfClientController = new GetAllPostOfClientController();
const getUniquePostOfClientController = new GetUniquePostOfClientController();
const makeACommentOnPostController = new MakeACommentOnPostController();
const updatedClientAvatarController = new UpdateClientAvatarController();

const clientRoute = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

clientRoute.post("/", crateNewClientController.handle);
clientRoute.use(ensureAuthentication);
clientRoute.post("/comment", makeACommentOnPostController.handle);
clientRoute.get("/posts/:id", getAllPostOfClientController.handle);
clientRoute.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  updatedClientAvatarController.handle
);
clientRoute.get(
  "/:clientId/posts/:postId",
  getUniquePostOfClientController.handle
);

export { clientRoute };
