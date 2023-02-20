import { Router } from "express";
import { ensureAuthentication } from "../modules/shared/infra/http/middlewares/ensureAuthentication";
import { ADMGetAllClientsController } from "../modules/admin/GetAllClientsInfos/GetAllClientsInfosController";
import { CreateCategoriesController } from "../modules/admin/CreateCategory/CreateCategoriesController";
import { adminEnsureAuthentication } from "../modules/shared/infra/http/middlewares/adminEnsureAuthetication";
import { DeleteCategoryController } from "../modules/categories/DeleteCategory/DeleteCategoryController";

const adminRoutes = Router();

const admGetAllClientInfosService = new ADMGetAllClientsController();
const crateCategoryController = new CreateCategoriesController();
const deleteCategoryController = new DeleteCategoryController();

adminRoutes.use(ensureAuthentication);
adminRoutes.use(adminEnsureAuthentication);
adminRoutes.use("/deletecategory", deleteCategoryController.handle);
adminRoutes.get("/clients", admGetAllClientInfosService.handle);
adminRoutes.post("/createcategory", crateCategoryController.handle);

export { adminRoutes };
