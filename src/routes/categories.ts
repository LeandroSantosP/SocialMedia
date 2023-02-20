import { Router } from "express";
import { ensureAuthentication } from "../modules/shared/infra/http/middlewares/ensureAuthentication";
import { CreateCategoryOnPostController } from "../modules/categories/CreateCategoryOnPost/CreateCategoryOnPostController";
import { GetAllCategoriesController } from "../modules/categories/getAllCategories/GetAllCategoryController";

const createCategoryOnPostController = new CreateCategoryOnPostController();
const getAllCategoriesController = new GetAllCategoriesController();

const categoryRoute = Router();

categoryRoute.get("/", getAllCategoriesController.handle);
categoryRoute.use(ensureAuthentication);
categoryRoute.post("/post", createCategoryOnPostController.handle);

export { categoryRoute };
