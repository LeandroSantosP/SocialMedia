import { Router } from "express";
import { AuthenticationClientController } from "../modules/clients/AuthenticationClient/AuthenticationClientController";

const authenticationRoutes = Router();
const authenticationClientController = new AuthenticationClientController();

authenticationRoutes.post("/sessions", authenticationClientController.handle);

export { authenticationRoutes };
