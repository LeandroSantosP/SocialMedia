import { Router } from "express";
import { ensureAuthentication } from "../modules/shared/infra/http/middlewares/ensureAuthentication";
import { ADMGetAllClientsController } from "../modules/admin/GetAllClientsInfos/GetAllClientsInfosController";
import { CreateCategoriesController } from "../modules/admin/CreateCategory/CreateCategoriesController";
import { adminEnsureAuthentication } from "../modules/shared/infra/http/middlewares/adminEnsureAuthetication";

const adminRoutes = Router();

const admGetAllClientInfosService = new ADMGetAllClientsController();
const crateCategoryController = new CreateCategoriesController();

adminRoutes.use(ensureAuthentication);
adminRoutes.use(adminEnsureAuthentication);
adminRoutes.get("/clients", admGetAllClientInfosService.handle);
adminRoutes.post("/createcategory", crateCategoryController.handle);

export { adminRoutes };
